# Generated by Django 3.0.6 on 2020-06-30 04:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blogs', '0002_auto_20200630_1122'),
    ]

    operations = [
        migrations.AddField(
            model_name='blog',
            name='poster',
            field=models.ImageField(default=1, upload_to='blog_images/'),
            preserve_default=False,
        ),
        migrations.DeleteModel(
            name='Poster',
        ),
    ]
