from crm.models import Customer

def get_fantasy_readers():

    customers = Customer.objects.filter(
        orders__genre="Fantasy"
    ).distinct()

    return customers