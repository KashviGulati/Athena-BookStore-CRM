from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Customer
from .serializers import CustomerSerializer
from django.shortcuts import get_object_or_404

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