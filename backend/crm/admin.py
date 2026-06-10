from django.contrib import admin
from .models import Customer, Order, Persona, AgentRun


admin.site.register(Customer)
admin.site.register(Order)
admin.site.register(Persona)
admin.site.register(AgentRun)