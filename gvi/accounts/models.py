from django.db import models


class Currency(models.Model):
    name = models.CharField(max_length=25)

    def __str__(self):
        return self.name


class Account(models.Model):
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
    currency = models.ForeignKey(Currency)

    def __str__(self):
        return self.name
