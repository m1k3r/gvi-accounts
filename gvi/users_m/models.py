from django.db import models
from django.contrib.auth.models import User

from hubs.models import Hubs


class UserHub(models.Model):
    HUB_MANAGER = 'h'
    C_MANAGER = 'c'
    SUPER_MANAGER = 's'
    TYPE_CHOICES = (
        (HUB_MANAGER, 'Hub Manager'),
        (C_MANAGER, 'Country Manager'),
        (SUPER_MANAGER, 'Super Manager'),
    )

    user = models.OneToOneField(User)
    hub = models.ForeignKey(Hubs)
    # type = models.CharField(max_length=20, choices=TYPE_CHOICES, default=HUB_MANAGER)
