# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('hubs', '__first__'),
    ]

    operations = [
        migrations.CreateModel(
            name='Account',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('account_type', models.CharField(default=b'c', max_length=5, choices=[(b'b', b'Bank'), (b'c', b'Cash')])),
                ('bank_name', models.CharField(max_length=25, blank=True)),
                ('number', models.CharField(max_length=140, blank=True)),
                ('balance', models.DecimalField(default=0.0, max_digits=19, decimal_places=2)),
                ('active', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='Currency',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=25)),
                ('contraction', models.CharField(max_length=5)),
            ],
        ),
        migrations.CreateModel(
            name='Transfer',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('amount', models.DecimalField(max_digits=19, decimal_places=2)),
                ('exchange_rate', models.DecimalField(max_digits=19, decimal_places=2)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('from_account', models.ForeignKey(related_name='from_account', to='accounts.Account')),
                ('to_account', models.ForeignKey(related_name='to_account', to='accounts.Account')),
            ],
        ),
        migrations.AddField(
            model_name='account',
            name='currency',
            field=models.ForeignKey(default=1, to='accounts.Currency'),
        ),
        migrations.AddField(
            model_name='account',
            name='owner',
            field=models.ForeignKey(default=1, to='hubs.Hubs'),
        ),
    ]
