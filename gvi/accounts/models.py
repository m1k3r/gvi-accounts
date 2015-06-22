from django.db import models


class Currency(models.Model):
    name = models.CharField(max_length=25)

    def __str__(self):
        return self.name


class Account(models.Model):
    DEFAULT_CURRENCY_ID = 1 # pounds ?
    BANK = 'b'
    CASH = 'c'
    TYPE_CHOICES = (
        (BANK, 'Bank'),
        (CASH, 'Cash'),
    )
    type = models.CharField(max_length=5, choices=TYPE_CHOICES, default=CASH)
    name = models.CharField(max_length=25)
    number = models.CharField(max_length=140)
    balance = models.DecimalField(decimal_places=10, max_digits=19)
    currency = models.ForeignKey(Currency, default=DEFAULT_CURRENCY_ID)

    def __str__(self):
        return self.name
