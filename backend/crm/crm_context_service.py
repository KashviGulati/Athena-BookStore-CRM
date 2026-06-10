from .models import Customer, Persona, Order


def build_crm_context():

    customer_count = Customer.objects.count()

    personas = list(
        Persona.objects.values_list(
            "persona_name",
            flat=True
        )
    )

    genres = list(
        Order.objects.values_list(
            "genre",
            flat=True
        ).distinct()
    )

    return {
        "customer_count": customer_count,
        "personas": personas,
        "genres": genres
    }