# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('budgets', '0002_budgetelement_variable_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='budgetelement',
            name='subcategory',
            field=models.ForeignKey(to='transactions.Subcategory', blank=True),
        ),
    ]
