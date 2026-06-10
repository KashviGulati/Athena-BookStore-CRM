from .models import Communication


def launch_campaign(campaign, customers):

    communications = []

    for customer in customers:

        communication = Communication.objects.create(
            campaign=campaign,
            customer=customer,
            status="PENDING"
        )

        communications.append(communication)

    return communications