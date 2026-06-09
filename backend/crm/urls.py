from django.urls import path
from .views import customer_list, customer_detail, upload_customers

urlpatterns = [
    path("customers/", customer_list),
    path("customers/<int:customer_id>/",customer_detail),
    path("customers/upload/",upload_customers),
]