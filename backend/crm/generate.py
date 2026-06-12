from crm.models import Customer, Persona
from crm.customer_service import build_customer_summary
from crm.gemini_service import generate_persona

for customer in Customer.objects.all():

    summary = build_customer_summary(customer)

    persona_data = generate_persona(summary)

    Persona.objects.update_or_create(
        customer=customer,
        defaults={
            "persona_name": persona_data["persona_name"],
            "description": persona_data["description"]
        }
    )

    print(customer.name, "done")