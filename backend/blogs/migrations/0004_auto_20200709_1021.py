# Generated by Django 3.0.6 on 2020-07-09 03:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('blogs', '0003_auto_20200630_1148'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='blog',
            name='poster',
        ),
        migrations.CreateModel(
            name='Poster',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='blog_images/')),
                ('blog', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='poster', to='blogs.Blog')),
            ],
        ),
    ]
