from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Customer, Order, Persona, AgentRun, Campaign
from .serializers import CustomerSerializer, CampaignSerializer
from django.shortcuts import get_object_or_404
from django.db.models import Sum

import random

from crm.models import Persona
from crm.customer_service import build_customer_summary
from crm.gemini_service import generate_persona
from .athena_service import build_campaign_strategy
from .segment_service import get_customers_by_genre
from .crm_context_service import build_crm_context

from .models import Campaign, Customer, Communication, CommunicationEvent, Segment
from .campaign_service import launch_campaign
from .segment_service import get_customers_by_genre

import csv
from io import TextIOWrapper

@api_view(["GET"])
def customer_list(request):
    customers = Customer.objects.all()

    serializer = CustomerSerializer(
        customers,
        many=True
    )

    return Response(serializer.data)


@api_view(["GET"])
def customer_detail(request, customer_id):
    customer = get_object_or_404(
        Customer,
        id=customer_id
    )

    serializer = CustomerSerializer(customer)

    return Response(serializer.data)


@api_view(["POST"])
def upload_customers(request):
    file = request.FILES.get("file")

    if not file:
        return Response(
            {"error": "No file uploaded"},
            status=400
        )

    csv_file = TextIOWrapper(
        file.file,
        encoding="utf-8"
    )

    reader = csv.DictReader(csv_file)

    count = 0

    for row in reader:
        Customer.objects.create(
            name=row["customer_name"],
            email=row["email"],
            phone=row["phone"]
        )

        count += 1

    return Response({
        "message": f"{count} customers uploaded"
    })

@api_view(["POST"])
def upload_orders(request):
    file = request.FILES.get("file")

    if not file:
        return Response(
            {"error": "No file uploaded"},
            status=400
        )

    csv_file = TextIOWrapper(
        file.file,
        encoding="utf-8"
    )

    reader = csv.DictReader(csv_file)

    count = 0

    for row in reader:

        customer = Customer.objects.get(
            id=row["customer_id"]
        )

        Order.objects.create(
            customer=customer,
            book_title=row["book_title"],
            genre=row["genre"],
            price=row["price"],
            purchase_date=row["purchase_date"]
        )

        count += 1

    return Response({
        "message": f"{count} orders uploaded"
    })


@api_view(["GET"])
def customer_summary(request, customer_id):
    customer = get_object_or_404(
        Customer,
        id=customer_id
    )

    total_orders = customer.orders.count()

    total_spend = (
        customer.orders.aggregate(
            total=Sum("price")
        )["total"]
        or 0
    )

    genres = list(
        customer.orders.values_list(
            "genre",
            flat=True
        ).distinct()
    )

    return Response({
        "id": customer.id,
        "name": customer.name,
        "email": customer.email,
        "phone": customer.phone,
        "total_orders": total_orders,
        "total_spend": total_spend,
        "genres": genres
    })


@api_view(["POST"])
def generate_customer_persona(request, customer_id):

    customer = get_object_or_404(
        Customer,
        id=customer_id
    )

    summary = build_customer_summary(customer)

    persona_data = generate_persona(summary)

    persona, created = Persona.objects.update_or_create(
        customer=customer,
        defaults={
            "persona_name": persona_data["persona_name"],
            "description": persona_data["description"]
        }
    )

    return Response({
        "customer_id": customer.id,
        "persona_name": persona.persona_name,
        "description": persona.description
    })


@api_view(["POST"])
def generate_campaign(request):

    goal = request.data.get("goal")
    print(request.data)
    print(goal)

    crm_context = build_crm_context()

    strategy = build_campaign_strategy(
        goal,
        crm_context
    )
    segment, created = Segment.objects.get_or_create(
        name=strategy["segment"]
    )
    audience_size = Customer.objects.filter(
        persona__persona_name=segment.name
    ).count()

    campaign = Campaign.objects.create(
        goal=goal,
        segment=segment,
        message=strategy["message"],
        channel=strategy["channel"],
        status="DRAFT"
)

    agent_run = AgentRun.objects.create(
        goal=goal,
        selected_segment=strategy["segment"],
        reasoning=strategy["reasoning"],
        recommended_channel=strategy["channel"]
    )
    return Response({
        "campaign_id": campaign.id,
        "agent_run_id": agent_run.id,
        "audience_size": audience_size,
        **strategy
})


@api_view(["GET"])
def fantasy_readers(request):

    customers = get_fantasy_readers()

    customer_data = [
        {
            "id": customer.id,
            "name": customer.name
        }
        for customer in customers
    ]

    return Response({
        "segment": "Fantasy Readers",
        "audience_size": customers.count(),
        "customers": customer_data
    })


@api_view(["POST"])
def launch_campaign_view(request, campaign_id):

    campaign = Campaign.objects.get(
        id=campaign_id
    )

    from crm.models import Persona

    customers = Customer.objects.filter(
        persona__persona_name=campaign.segment.name
    )

    communications = launch_campaign(
        campaign,
        customers
    )
    campaign.status = "LAUNCHED"
    campaign.save()

    return Response({
        "campaign_id": campaign.id,
        "communications_created": len(
            communications
        )
    })

@api_view(["POST"])
def receive_receipt(request):

    communication_id = request.data.get(
        "communication_id"
    )

    event = request.data.get(
        "event"
    )

    communication = Communication.objects.get(
        id=communication_id
    )

    communication.status = event
    communication.save()

    CommunicationEvent.objects.create(
        communication=communication,
        event_type=event
    )

    return Response({
        "message": "Receipt received"
    })


@api_view(["GET"])
def campaign_analytics(request, campaign_id):

    campaign = Campaign.objects.get(
        id=campaign_id
    )

    sent = Communication.objects.filter(
        campaign=campaign
    ).count()

    delivered = CommunicationEvent.objects.filter(
        communication__campaign=campaign,
        event_type="DELIVERED"
    ).count()

    failed = CommunicationEvent.objects.filter(
        communication__campaign=campaign,
        event_type="FAILED"
    ).count()

    opened = CommunicationEvent.objects.filter(
        communication__campaign=campaign,
        event_type="OPENED"
    ).count()

    clicked = CommunicationEvent.objects.filter(
        communication__campaign=campaign,
        event_type="CLICKED"
    ).count()

    return Response({
        "campaign_id": campaign.id,
        "sent": sent,
        "delivered": delivered,
        "failed": failed,
        "opened": opened,
        "clicked": clicked
    })


@api_view(["GET"])
def campaign_list(request):

    campaigns = Campaign.objects.all()

    serializer = CampaignSerializer(
        campaigns,
        many=True
    )

    return Response(
        serializer.data
    )

@api_view(["GET"])
def dashboard_stats(request):

    return Response({
        "customers": Customer.objects.count(),
        "orders": Order.objects.count(),
        "personas": Persona.objects.count(),
        "campaigns": Campaign.objects.count(),
        "communications": Communication.objects.count()
    })


@api_view(["POST"])
def simulate_channel_delivery(request):

    pending = Communication.objects.filter(
        status="PENDING"
    )

    processed = []

    for communication in pending:

        status = random.choice([
            "DELIVERED",
            "FAILED",
            "OPENED",
            "CLICKED"
        ])

        communication.status = status
        communication.save()

        CommunicationEvent.objects.create(
            communication=communication,
            event_type=status
        )

        processed.append({
            "id": communication.id,
            "status": status
        })

    return Response({
        "processed": len(processed),
        "results": processed
    })


@api_view(["GET"])
def pending_communications(request):

    communications = Communication.objects.all()

    data = []

    for c in communications:
        data.append({
            "id": c.id,
            "customer": c.customer.name,
            "campaign": c.campaign.goal,
            "status": c.status
        })

    return Response(data)