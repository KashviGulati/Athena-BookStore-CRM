from rest_framework import serializers
from .models import Customer, Order, Campaign


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = "__all__"


class CustomerSerializer(serializers.ModelSerializer):
    orders = OrderSerializer(many=True, read_only=True)

    class Meta:
        model = Customer
        fields = "__all__"

class CampaignSerializer(serializers.ModelSerializer):

    class Meta:
        model = Campaign
        fields = "__all__"