# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Budget',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('number', models.CharField(unique=True, max_length=100)),
                ('initial_date', models.DateTimeField()),
                ('final_date', models.DateTimeField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='BudgetElement',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('budget_type', models.CharField(default=b'f', max_length=5, choices=[(b'f', b'Fixed'), (b'v', b'Variable')])),
                ('amount', models.DecimalField(default=0, max_digits=19, decimal_places=10)),
                ('number', models.ForeignKey(to='budgets.Budget')),
            ],
        ),
    ]
