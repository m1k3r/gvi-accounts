# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('hubs', '0002_usertype'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserHub',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('type', models.CharField(default=b'h', max_length=20, choices=[(b'h', b'Hub Manager'), (b'c', b'Country Manager'), (b's', b'Super Manager')])),
                ('hub', models.ForeignKey(to='hubs.Hubs')),
                ('user', models.OneToOneField(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.RemoveField(
            model_name='usertype',
            name='user',
        ),
        migrations.DeleteModel(
            name='UserType',
        ),
    ]
