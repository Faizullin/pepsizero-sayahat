import uuid

from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db.models import Sum
from django_softdelete.models import SoftDeleteModel

from apps.products.models import Product
from utils.models import AbstractTimestampedModel, models


UserModel = get_user_model()

def _generate_order_number():
    """
    Generate an order number using UUID.
    """
    return uuid.uuid4().hex.upper()


class Order(AbstractTimestampedModel, SoftDeleteModel):
    order_number = models.CharField(max_length=32, null=False, editable=False)
    user = models.ForeignKey(UserModel, on_delete=models.SET_NULL,
                                     null=True, blank=True,
                                     related_name='orders')
    first_name = models.CharField(max_length=32, null=False, blank=False)
    last_name = models.CharField(max_length=32, null=False, blank=False)
    email = models.EmailField(max_length=254, null=False, blank=False)
    address_line_1 = models.CharField(max_length=80, null=False, blank=False)
    address_line_2 = models.CharField(max_length=80, null=False, blank=False)
    town_or_city = models.CharField(max_length=80, null=False, blank=False)
    county = models.CharField(max_length=80, null=False, blank=False)
    postcode = models.CharField(max_length=80, null=False, blank=True)
    delivery_cost = models.DecimalField(max_digits=6, decimal_places=2,
                                        null=False, default=0)
    order_total = models.DecimalField(max_digits=10,
                                      decimal_places=2, null=False, default=0)
    grand_total = models.DecimalField(max_digits=10, decimal_places=2,
                                      null=False, default=0)
    original_cart = models.TextField(null=False, blank=False, default='')
    stripe_pid = models.CharField(max_length=254, null=False, blank=False,
                                  default='')

    def update_total(self):
        """
        Update grand total each time a line item is added,
        accounting for delivery cost.
        """

        self.order_total = (self
                            .lineitems
                            .aggregate
                            (Sum('lineitem_total'))
                            ['lineitem_total__sum']) or 0

        # if self.order_total < settings.FREE_DELIVERY_THRESHOLD:
        #     self.delivery_cost = (self.order_total *
        #                           settings.STANDARD_DELIVERY_PERCENTAGE) / 100
        #
        # else:
        #     self.delivery_cost = 0
        self.delivery_cost = 0
        self.grand_total = self.order_total + self.delivery_cost
        self.save()

    def save(self, *args, **kwargs):
        """
        Override the original save method to set the order number if it hasn't
        been set already.
        """
        if not self.order_number:
            self.order_number = _generate_order_number()
        super().save(*args, **kwargs)

    def __str__(self):
        return '{}, {}'.format(self.order_number,
                               self.user_profile)


class OrderLineItem(AbstractTimestampedModel, SoftDeleteModel):
    order = models.ForeignKey(Order, null=False, blank=False,
                              on_delete=models.CASCADE,
                              related_name='lineitems',)
    product = models.ForeignKey(Product, null=False, blank=False,
                                on_delete=models.CASCADE,)
    product_color = models.CharField(max_length=20,
                                     null=True, blank=True)
    quantity = models.IntegerField(null=False, blank=False, default=0)
    lineitem_total = models.DecimalField(max_digits=6, decimal_places=2,
                                         null=False, blank=False,
                                         editable=False)

    def save(self, *args, **kwargs):
        """
        Override the original save method to set the order number if it
        hasn't been set already.
        """
        self.lineitem_total = self.product.price * self.quantity
        super().save(*args, **kwargs)

    def __str__(self):
        return '{}, {}, {}, {}'.format(self.order,
                                       self.product,
                                       self.quantity,
                                       self.lineitem_total)


class PaymentState(models.TextChoices):
    SUCCESS = 'success', 'Success'
    ERROR = 'error', 'Error'


class Payment(AbstractTimestampedModel, SoftDeleteModel):
    payment_id = models.UUIDField(
        default=uuid.uuid4, editable=False, unique=True)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')
    user = models.ForeignKey(
        UserModel, on_delete=models.SET_NULL, null=True, blank=True, related_name='payments')
    amount = models.DecimalField(
        max_digits=10, decimal_places=2, null=False, blank=False)
    payment_method = models.CharField(max_length=32, null=False, blank=False)
    payment_status = models.CharField(
        max_length=20, choices=PaymentState.choices)

    def __str__(self):
        return f'Payment {self.payment_id} for {self.content_object}'
