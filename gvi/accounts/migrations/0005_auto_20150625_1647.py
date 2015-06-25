# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('hubs', '0003_merge'),
        ('accounts', '0004_auto_20150624_2120'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='owner',
            field=models.ForeignKey(default='GVI', to='hubs.Hubs'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='account',
            name='balance',
            field=models.DecimalField(default=0, max_digits=19, decimal_places=2),
        ),
        migrations.AlterField(
            model_name='transfer',
            name='amount',
            field=models.DecimalField(max_digits=19, decimal_places=2),
        ),
        migrations.AlterField(
            model_name='transfer',
            name='exchange_rate',
            field=models.DecimalField(max_digits=19, decimal_places=2),
        ),
    ]
