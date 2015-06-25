from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=50)
    number = models.CharField(max_length=50, unique=True)
    
    def __str__(self):
        return self.number


class Subcategory(models.Model):
    name = models.CharField(max_length=50)
    category = models.ForeignKey(Category)

    def __str__(self):
        return self.name


class Transaction(models.Model):
    IN = 'i'
    OUT = 'o'
    TYPE_CHOICES = (
            (IN, 'Money In'),
            (OUT, 'Money Out'),
    )
    transaction_type = models.CharField(max_length=5, choices=TYPE_CHOICES, default=OUT)
    category = models.ForeignKey(Category)
    date = models.DateTimeField()
    subcategory = models.ForeignKey(Subcategory, blank=True)
    comment = models.CharField(max_length=200, blank=True)
    amount = models.CharField(max_length=50)
    balance = models.CharField(max_length=50)

    def __str__(self):
        return self.transaction_type + amount
