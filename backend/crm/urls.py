from django.urls import path
from .views import customer_list, customer_detail, upload_customers, upload_orders, customer_summary

urlpatterns = [
    path("customers/", customer_list),
    path("customers/<int:customer_id>/",customer_detail),
    path("customers/upload/",upload_customers),
    path("orders/upload/",upload_orders),
    path("customers/<int:customer_id>/summary/",customer_summary),
]