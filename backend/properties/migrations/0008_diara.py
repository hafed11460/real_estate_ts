# Generated by Django 4.2 on 2024-10-20 08:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('properties', '0007_alter_amenity_options_alter_propertiesimage_image'),
    ]

    operations = [
        migrations.CreateModel(
            name='Diara',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('lat', models.DecimalField(decimal_places=8, max_digits=10)),
                ('lng', models.DecimalField(decimal_places=8, max_digits=10)),
                ('city', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='properties.city', verbose_name='City')),
            ],
        ),
    ]
