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
    
class AgentRun(models.Model):
    goal = models.TextField()

    selected_segment = models.CharField(
        max_length=255
    )

    reasoning = models.TextField()

    recommended_channel = models.CharField(
        max_length=50
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.goal
    


class Segment(models.Model):
    name = models.CharField(max_length=255)

    criteria = models.TextField()

    audience_size = models.IntegerField(default=0)

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.name
    

class Campaign(models.Model):
    goal = models.TextField()

    segment = models.ForeignKey(
        Segment,
        on_delete=models.SET_NULL,
        null=True
    )

    message = models.TextField()

    channel = models.CharField(
        max_length=50
    )

    status = models.CharField(
        max_length=50,
        default="DRAFT"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )


class Communication(models.Model):

    campaign = models.ForeignKey(
        Campaign,
        on_delete=models.CASCADE,
        related_name="communications"
    )

    customer = models.ForeignKey(
        Customer,
        on_delete=models.CASCADE
    )

    status = models.CharField(
        max_length=50,
        default="PENDING"
    )

    sent_at = models.DateTimeField(
        null=True,
        blank=True
    )


class CommunicationEvent(models.Model):

    communication = models.ForeignKey(
        Communication,
        on_delete=models.CASCADE
    )

    event_type = models.CharField(
        max_length=50
    )

    timestamp = models.DateTimeField(
        auto_now_add=True
    )