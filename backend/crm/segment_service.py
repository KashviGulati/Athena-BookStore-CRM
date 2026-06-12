from crm.models import Customer


def get_customers_by_genre(genre):

    return Customer.objects.filter(
        orders__genre=genre
    ).distinct()