from django.db import models
from django.utils import timezone


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
    amount = models.DecimalField(decimal_places=2, max_digits=19)
    balance = models.DecimalField(decimal_places=2, max_digits=19)
    account = models.ForeignKey('accounts.Account')

    def __str__(self):
        return self.transaction_type + str(self.amount)

    @classmethod
    def first_year(cls):
        years = cls.objects.order_by('date')[0].date.year
        return years

    @classmethod
    def year_range(cls):
        year_range = [cls.first_year()]

        if timezone.now().year == year_range:
            return year_range
        else:
            while year_range[-1] != timezone.now().year:
                year_range.append(year_range[-1] + 1)
            return year_range

        return 'Critical Error'
