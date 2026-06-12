from .models import Customer, Persona, Order
from django.db.models import Count


def build_crm_context():

    customer_count = Customer.objects.count()

    personas = list(
        Persona.objects.values_list(
            "persona_name",
            flat=True
        ).distinct()
    )

    genre_distribution = list(
        Order.objects.values(
            "genre"
        ).annotate(
            count=Count("id")
        )
    )

    return {
        "customer_count": customer_count,
        "personas": personas,
        "genre_distribution": genre_distribution
    }