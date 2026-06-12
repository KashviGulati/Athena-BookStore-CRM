from .models import Communication
import requests


def launch_campaign(campaign, customers):

    communications = []

    for customer in customers:

        communication = Communication.objects.create(
            campaign=campaign,
            customer=customer,
            status="PENDING"
        )

        requests.post(
            "http://127.0.0.1:8001/send",
            json={
                "communication_id": communication.id,
                "channel": campaign.channel,
                "message": campaign.message
            }
        )

        communications.append(
            communication
        )

    return communications