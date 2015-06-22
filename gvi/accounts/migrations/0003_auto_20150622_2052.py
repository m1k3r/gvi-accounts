# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_auto_20150622_1553'),
    ]

    operations = [
        migrations.CreateModel(
            name='Transfer',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('amount', models.DecimalField(max_digits=19, decimal_places=10)),
                ('exchange_rate', models.DecimalField(max_digits=19, decimal_places=10)),
                ('date', models.DateTimeField()),
            ],
        ),
        migrations.RenameField(
            model_name='account',
            old_name='type',
            new_name='account_type',
        ),
        migrations.RemoveField(
            model_name='account',
            name='name',
        ),
        migrations.AddField(
            model_name='account',
            name='active',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='account',
            name='bank_name',
            field=models.CharField(max_length=25, blank=True),
        ),
        migrations.AddField(
            model_name='currency',
            name='contraction',
            field=models.CharField(default='MXN', max_length=5),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='account',
            name='balance',
            field=models.DecimalField(default=0, max_digits=19, decimal_places=10),
        ),
        migrations.AlterField(
            model_name='account',
            name='number',
            field=models.CharField(max_length=140, blank=True),
        ),
        migrations.AddField(
            model_name='transfer',
            name='from_account',
            field=models.ForeignKey(related_name='from_account', to='accounts.Account'),
        ),
        migrations.AddField(
            model_name='transfer',
            name='to_account',
            field=models.ForeignKey(related_name='to_account', to='accounts.Account'),
        ),
    ]
