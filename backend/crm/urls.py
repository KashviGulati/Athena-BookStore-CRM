from django.urls import path
from .views import customer_list, customer_detail

urlpatterns = [
    path("customers/", customer_list),
    path(
    "customers/<int:customer_id>/",customer_detail),
]