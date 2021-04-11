# Generated by Django 3.2 on 2021-04-11 21:43

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('bugs', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='comment_date',
            field=models.DateTimeField(default=django.utils.timezone.now, verbose_name='date posted'),
            preserve_default=False,
        ),
    ]
