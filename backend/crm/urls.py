from django.urls import path
from .views import customer_list, customer_detail, upload_customers, upload_orders, customer_summary, generate_customer_persona, generate_campaign, fantasy_readers, launch_campaign_view, receive_receipt, campaign_analytics

urlpatterns = [
    path("customers/", customer_list),
    path("customers/<int:customer_id>/",customer_detail),
    path("customers/upload/",upload_customers),
    path("orders/upload/",upload_orders),
    path("customers/<int:customer_id>/summary/",customer_summary),
    path("personas/generate/<int:customer_id>/",generate_customer_persona),
    path("athena/generate-campaign/",generate_campaign),
    path("segments/fantasy-readers/",fantasy_readers),
    path("campaigns/<int:campaign_id>/launch/",launch_campaign_view),
    path("receipts/",receive_receipt),
    path("campaigns/<int:campaign_id>/analytics/",campaign_analytics),
]