# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('budgets', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='budgetelement',
            name='variable_type',
            field=models.CharField(default=b'o', max_length=5, choices=[(b'f', b'First Week'), (b'o', b'Other Week')]),
        ),
    ]
