# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='currency',
            field=models.ForeignKey(default=1, to='accounts.Currency'),
        ),
        migrations.AddField(
            model_name='account',
            name='type',
            field=models.CharField(default=b'c', max_length=5, choices=[(b'b', b'Bank'), (b'c', b'Cash')]),
        ),
    ]
