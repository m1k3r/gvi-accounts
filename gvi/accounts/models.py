from django.db import models


class Account(models.Model):
    name = models.CharField(max_length=25)
    number = models.CharField(max_length=140)
    balance = models.DecimalField()

    def __str__(self):
        return self.name


class Currency(models.Model):
    name = models.CharField(max_length=25)
