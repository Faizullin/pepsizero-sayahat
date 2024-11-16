from django.contrib import admin

from utils.admin import BaseAdmin
from .models import TourPeriod, TourPackage, TourPeriodPaymentDeposit, CustomerReview


@admin.register(TourPeriod)
class TourPeriodAdmin(BaseAdmin):
    list_display = ('id', 'price', 'offer', 'is_published', 'starts_at', 'ends_at')
    list_filter = ('is_published',)
    readonly_fields = ("id",)


@admin.register(TourPackage)
class TourPackageAdmin(BaseAdmin):
    list_display = ('id', 'name', 'is_published', 'created_at', 'updated_at')
    search_fields = ('name',)
    readonly_fields = ('id',)


@admin.register(TourPeriodPaymentDeposit)
class TourPeriodPaymentDepositAdmin(BaseAdmin):
    list_display = ('id', 'amount', 'created_at', 'updated_at')
    readonly_fields = ("id",)


@admin.register(CustomerReview)
class CustomerReviewAdmin(BaseAdmin):
    list_display = ('id', 'first_name', 'last_name', 'author', 'is_published', 'created_at', 'updated_at')
    list_filter = ('author', 'is_published')
