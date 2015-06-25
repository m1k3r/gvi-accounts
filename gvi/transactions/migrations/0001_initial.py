# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=50)),
                ('number', models.CharField(unique=True, max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Subcategory',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=50)),
                ('category', models.ForeignKey(to='transactions.Category')),
            ],
        ),
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('transaction_type', models.CharField(default=b'o', max_length=5, choices=[(b'i', b'Money In'), (b'o', b'Money Out')])),
                ('date', models.DateTimeField()),
                ('comment', models.CharField(max_length=200, blank=True)),
                ('amount', models.CharField(max_length=50)),
                ('balance', models.CharField(max_length=50)),
                ('category', models.ForeignKey(to='transactions.Category')),
                ('subcategory', models.ForeignKey(to='transactions.Subcategory', blank=True)),
            ],
        ),
    ]
