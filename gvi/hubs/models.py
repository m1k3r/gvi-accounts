from django.db import models

class Hubs(models.Model):
    HUB = 'h'
    C_MANAGER = 'c'
    TYPE_CHOICES = (
            (HUB, 'Hub'),
            (C_MANAGER, 'CM'),
    )
    hub_type = models.CharField(maxlength=5, choices=TYPE_CHOICES, default=HUB)
    name = models.CharField(max_length=100)
    manager = models.CharField(max_length=100)
    country = models.CharField(max_length=50)
    active = models.BooleanField(defoult=True)
    #Hub area ?
