from django.db import models
from django.contrib.auth.models import User

from accounts.models import Account


class Hubs(models.Model):
    HUB = 'h'
    C_MANAGER = 'c'
    TYPE_CHOICES = (
        (HUB, 'Hub'),
        (C_MANAGER, 'Country Manager'),
    )
    hub_type = models.CharField(max_length=5, choices=TYPE_CHOICES, default=HUB)
    name = models.CharField(max_length=100)
    manager = models.CharField(max_length=100)
    country = models.CharField(max_length=50)
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

    def bank_accounts(self):
        accounts = Account.objects.filter(owner=self).filter(account_type='b')
        return accounts

    def cash_accounts(self):
        accounts = Account.objects.filter(owner=self).filter(account_type='c')
        return accounts


class UserType(models.Model):
    HUB_MANAGER = 'h'
    C_MANAGER = 'c'
    SUPER_MANAGER = 's'
    TYPE_CHOICES = (
        (HUB_MANAGER, 'Hub Manager'),
        (C_MANAGER, 'Country Manager'),
        (SUPER_MANAGER, 'Super Manager'),
    )
    user = models.ManyToManyField(User)
    type = models.CharField(max_lenght=20, choices=TYPE_CHOICES, default=HUB_MANAGER)

