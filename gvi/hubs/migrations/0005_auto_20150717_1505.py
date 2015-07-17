# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('hubs', '0004_remove_userhub_type'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userhub',
            name='hub',
        ),
        migrations.RemoveField(
            model_name='userhub',
            name='user',
        ),
        migrations.DeleteModel(
            name='UserHub',
        ),
    ]
