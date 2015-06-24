# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_auto_20150622_2052'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='number',
            field=models.CharField(unique=True, max_length=140, blank=True),
        ),
    ]
