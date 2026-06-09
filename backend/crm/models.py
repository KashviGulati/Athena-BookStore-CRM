from django.db import models


class Customer(models.Model):
    name = models.CharField(max_length=255)

    email = models.EmailField(unique=True)

    phone = models.CharField(max_length=20)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    

class Order(models.Model):
    customer = models.ForeignKey(
        Customer,
        on_delete=models.CASCADE,
        related_name="orders"
    )

    book_title = models.CharField(max_length=255)

    genre = models.CharField(max_length=100)

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    purchase_date = models.DateField()

    def __str__(self):
        return f"{self.book_title} - {self.customer.name}"
    

class Persona(models.Model):
    customer = models.OneToOneField(
        Customer,
        on_delete=models.CASCADE,
        related_name="persona"
    )

    persona_name = models.CharField(max_length=100)

    description = models.TextField()

    generated_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.persona_name