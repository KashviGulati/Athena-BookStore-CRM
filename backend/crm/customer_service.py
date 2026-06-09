from django.db.models import Sum


def build_customer_summary(customer):

    total_orders = customer.orders.count()

    total_spend = (
        customer.orders.aggregate(
            total=Sum("price")
        )["total"]
        or 0
    )

    genres = list(
        customer.orders.values_list(
            "genre",
            flat=True
        ).distinct()
    )

    return {
        "name": customer.name,
        "total_orders": total_orders,
        "total_spend": float(total_spend),
        "genres": genres
    }