# export_data.py
from crm.models import *
import json

data = {
    "customers": list(Customer.objects.values()),
    "orders": list(Order.objects.values()),
    "personas": list(Persona.objects.values()),
    "campaigns": list(Campaign.objects.values()),
}

with open("export.json", "w", encoding="utf-8") as f:
    json.dump(data, f, default=str)