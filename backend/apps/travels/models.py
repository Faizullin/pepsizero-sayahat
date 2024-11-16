from django.contrib.auth import get_user_model
from django.core.validators import MaxValueValidator, MinValueValidator

from apps.file_system.models import File
from utils.models import AbstractTimestampedModel, models

UserModel = get_user_model()


# class DestinationGuide(AbstractTimestampedModel, TranslatableModel):
#     translations = TranslatedFields(
#         name=models.CharField(max_length=200),
#         description=models.TextField(),
#     )
#     day = models.PositiveIntegerField()
#     image = models.ImageField(upload_to='destination_guides/')
#
#     def __str__(self):
#         return f"{self.pk}, Day {self.day}"


class TourPeriodPaymentDeposit(AbstractTimestampedModel):
    amount = models.DecimalField(
        max_digits=10, decimal_places=2, default=0.00)


class TourPeriod(AbstractTimestampedModel):
    starts_at = models.DateField(null=False)
    ends_at = models.DateField(null=False)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    offer = models.CharField(max_length=100, default="")
    is_published = models.BooleanField(default=True)

    deposits = models.ManyToManyField(TourPeriodPaymentDeposit, blank=True)


class TourPackage(AbstractTimestampedModel):
    # translations = TranslatedFields(
    #     name=models.CharField(max_length=200),
    #     description=models.TextField(),
    # )
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    dates = models.ManyToManyField(TourPeriod)
    image = models.ForeignKey(
        File,
        on_delete=models.SET_NULL,
        related_name="tour_packages",
        null=True,
        blank=True,
    )
    is_published = models.BooleanField(default=True)
    gallery_images = models.ManyToManyField(File, blank=True, related_name="gallery_tour_packages")

    def __str__(self):
        return self.name


class CustomerReview(AbstractTimestampedModel):
    # translations = TranslatedFields(
    #     first_name=models.CharField(max_length=100),
    #     last_name=models.CharField(max_length=100),
    #     comment=models.TextField(),
    # )
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    comment = models.TextField()
    tour_package = models.ForeignKey(
        TourPackage, related_name='reviews', on_delete=models.CASCADE)
    author = models.ForeignKey(UserModel, on_delete=models.CASCADE)
    rating = models.IntegerField(
        validators=[
            MaxValueValidator(10),
            MinValueValidator(0)
        ],
    )
    image = models.ForeignKey(
        File,
        on_delete=models.SET_NULL,
        related_name="customer_reviews",
        null=True,
        blank=True,
    )
    is_published = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.author} - {self.pk}'
