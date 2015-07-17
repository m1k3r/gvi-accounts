# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('hubs', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserType',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('type', models.CharField(default=b'h', max_length=20, choices=[(b'h', b'Hub Manager'), (b'c', b'Country Manager'), (b's', b'Super Manager')])),
                ('user', models.ManyToManyField(to='hubs.Hubs')),
            ],
        ),
    ]
