from django.db import models
from users.models import WithTimestamp
from users.models import User
from django.contrib.gis.db import models
from django.utils import timezone
from django.contrib.gis.geos import Point
from django.core.exceptions import ValidationError
import PIL
from io import BytesIO
from django.core.files import File 

# Create your models here.

def get_default_logo_image():
    return "agency/logo/default.png"

def get_default_cover_image():
    return "agency/cover/default.png"


def get_agency_logo_filepath(self, filename):    
    return f'agency/logo/{self.pk}/{filename}'


def get_agency_cover_filepath(self, filename):
    return f'agency/cover/{self.pk}/{filename}'


class Agency(WithTimestamp):
    saller = models.OneToOneField(User, on_delete=models.CASCADE,related_name="agency")
    name = models.CharField(max_length=255,blank=True, null=True)
    phone = models.CharField(max_length=20,blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    logo = models.ImageField(blank=True,null=True,default=get_default_logo_image,
        upload_to=get_agency_logo_filepath)
    cover = models.ImageField(blank=True,null=True,default=get_default_cover_image,
        upload_to=get_agency_cover_filepath)
    
    class Meta:
        verbose_name_plural = "agencies"


    def __str__(self):
        if self.name:
            return f'{self.name}'
        else:
            return f'{self.pk}'




