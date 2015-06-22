from django.db import models


class Currency(models.Model):
    name = models.CharField(max_length=25)
    contraction = models.CarField(max_length=5)
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
    account_type = models.CharField(max_length=5, choices=TYPE_CHOICES, default=CASH)
    bank_name = models.CharField(max_length=25, blank=True)
    number = models.CharField(max_length=140, blank=True)
    balance = models.DecimalField(decimal_places=10, max_digits=19, default=0)
    currency = models.ForeignKey(Currency, default=DEFAULT_CURRENCY_ID)
    active = models.BooleanField(initial=True)
    #add the account owner
    
    def __str__(self):
        if(account_type == 'b')
            return self.number
        else
            return self.currency
