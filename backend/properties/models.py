from django.db import models
from users.models import WithTimestamp
from django.contrib.gis.db import models
from django.core.exceptions import ValidationError
import PIL
from io import BytesIO
from django.core.files import File 
from agencies.models import Agency
from users.models import User

class Amenity(models.Model):
    name = models.CharField(max_length=50)
    class Meta:
        verbose_name_plural = "amenties"
    
    def __str__(self) -> str:
        return f'{self.name}'

class City(models.Model):
    name = models.CharField(max_length=50)
    lat = models.DecimalField(max_digits=10, decimal_places=8)
    lng = models.DecimalField(max_digits=10, decimal_places=8)

    class Meta:
        verbose_name_plural = "cities"

    def __str__(self) -> str:
        return f'{self.name}'



def compress_image(picture):
    if picture:
        pic = PIL.Image.open(picture)
        buf = BytesIO()
        pic.save(buf,'JPEG',quality=35)
        # pic.save(buf,'JPEG',quality=35)
        new_pic = File(buf, name=picture.name)
        return new_pic
    else:
        return None 

def property_images_filepath(self, filename):
    # filename, file_extension = os.path.splitext(filename)
    return f'properties/{self.property.pk}/{filename}'


def validate_file_size(value):
    filesize = value.size
    if filesize > 2621440:
        raise ValidationError(
            "The maximum file size that can be uploaded is 10MB")
    else:
        return value


class Property(WithTimestamp):

    agency = models.ForeignKey(Agency, on_delete=models.CASCADE , related_name="properties")
    user = models.ForeignKey(User, on_delete=models.CASCADE , related_name="properties")

  
    ###############################################################
    # basic info 
    title = models.CharField(max_length=150)
    description = models.TextField(null=True, blank=True)
    choices_category = (
        ('Sale','Sale'),
        ('Rent','Rent'),
    )
    category = models.CharField( choices=choices_category, max_length=50, blank=True, null=True)

    choices_property_type = (
        ('House','House'),
        ('Apartment','Apartment'),
        ('Office','Office'),
        ('Commercial','Commercial'),
    )
    property_type = models.CharField(choices=choices_property_type, max_length=50,blank=True, null=True)
    
    
    ###############################################################
    # location
    city = models.ForeignKey(City, on_delete=models.CASCADE , related_name="properties" ,blank=True,null=True)    
    latitude = models.DecimalField(max_digits=25,decimal_places=23)
    longitude = models.DecimalField(max_digits=25,decimal_places=23)
    # location = models.PointField(blank=True, null=True,srid=4326)


    ###############################################################
    # Price 
    choices_price_type = (
        ('Day','Day'),
        ('Week','Week'),
        ('Month','Month'),
        ('Year','Year'),
    )
    price = models.DecimalField(max_digits=50, decimal_places=0)
    price_per = models.CharField(choices=choices_price_type, max_length=50,blank=True, null=True)
    
    ###############################################################
    # Property Detail 
    total_area = models.DecimalField(max_digits=8, decimal_places=2)    
    amenities = models.ManyToManyField(Amenity)
    rooms = models.IntegerField(blank=True, null=True)

       
    date_posted = models.DateTimeField(auto_now_add=True)
    active = models.BooleanField(default=True)

    ###############################################################
    # Contacts 
    first_name = models.CharField(max_length=50,blank=True, null=True)
    last_name = models.CharField(max_length=50,blank=True, null=True)
    email_name = models.CharField(max_length=50,blank=True, null=True)
    phone = models.CharField(max_length=50,blank=True, null=True)
    

    class Meta:
        verbose_name_plural = "properties"

    def __str__(self):
        if self.title:
            return f'{self.title}'

        else:
            return f'{self.pk}'

class PropertiesVideo(WithTimestamp):
    property = models.ForeignKey(Property, related_name="videos", on_delete=models.CASCADE)
    video = models.URLField(max_length=524)


class PropertiesImage(WithTimestamp):
    property = models.ForeignKey(
        Property, related_name="images", on_delete=models.CASCADE)
    image = models.ImageField("image", upload_to=property_images_filepath, validators=[
                             validate_file_size], max_length=100)   

    def __str__(self):
        return self.image.url

    def save(self, *args, **kwargs):
        # image  = compress_image(self.image)
        # self.image = image
        image = PIL.Image.open(self.image)
        image.save(self.image,quality=35,optimize=True)
        super().save(*args, **kwargs)


