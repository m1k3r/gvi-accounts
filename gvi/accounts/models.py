from django.db import models


class Account(models.Model):
    name = models.CharField(max_length=25)
    number = models.CharField(max_length=140)
    balance = models.DecimalField(decimal_places=10, max_digits=19)

    def __str__(self):
        return self.name


class Currency(models.Model):
    name = models.CharField(max_length=25)

    def __str__(self):
        return self.name
