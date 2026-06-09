from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Customer, Order
from .serializers import CustomerSerializer
from django.shortcuts import get_object_or_404
from django.db.models import Sum

from crm.models import Persona
from crm.customer_service import build_customer_summary
from crm.gemini_service import generate_persona


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