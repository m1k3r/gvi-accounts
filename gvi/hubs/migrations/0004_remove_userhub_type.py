# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('hubs', '0003_auto_20150715_2223'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userhub',
            name='type',
        ),
    ]
