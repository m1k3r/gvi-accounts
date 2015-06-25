# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0005_auto_20150625_1647'),
        ('transactions', '0003_auto_20150625_1647'),
        ('hubs', '0003_merge'),
        ('budgets', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='budget',
            name='hub',
            field=models.ForeignKey(default='GVI', to='hubs.Hubs'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='budgetelement',
            name='category',
            field=models.ForeignKey(default='Fuel', to='transactions.Category'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='budgetelement',
            name='currency',
            field=models.ForeignKey(default='Pesos', to='accounts.Currency'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='budgetelement',
            name='subcategory',
            field=models.ForeignKey(default='Car Fuel', to='transactions.Subcategory'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='budgetelement',
            name='amount',
            field=models.DecimalField(default=0, max_digits=19, decimal_places=2),
        ),
    ]
