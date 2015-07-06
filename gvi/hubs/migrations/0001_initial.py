# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Hubs',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('hub_type', models.CharField(default=b'h', max_length=5, choices=[(b'h', b'Hub'), (b'c', b'Country Manager')])),
                ('name', models.CharField(max_length=100)),
                ('manager', models.CharField(max_length=100)),
                ('country', models.CharField(max_length=50)),
                ('active', models.BooleanField(default=True)),
            ],
        ),
    ]
