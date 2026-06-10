from django.contrib import admin
from .models import Customer, Order, Persona, AgentRun, Campaign, Communication


admin.site.register(Customer)
admin.site.register(Order)
admin.site.register(Persona)
admin.site.register(AgentRun)
admin.site.register(Campaign)
admin.site.register(Communication)

