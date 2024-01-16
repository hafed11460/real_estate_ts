from typing import Any, Dict
from django import forms
from .models import Property 
from django.contrib.gis.geos import Point 

class PropertyForm(forms.ModelForm):
    class Meta:
        model = Property
        fields = ['agency','title','description','area','borough','property_type','property_status',
                  'price','rental_frequency','rooms','furnished','pool','elevator','cctv','parking',
                  'latitude','longitude']

    # latitude = forms.FloatField()
    # longitude = forms.FloatField()

    def clean(self):
        data =  super().clean()
        latitude = data.pop('latitude')
        longitude = data.pop('longitude')
        data['location'] = Point(latitude, longitude, srid=4326)

        return data
    

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        location = self.initial.get('location')
        if isinstance(location, Point):
            self.initial['latitude'] = location.tuple[0]
            self.initial['longitude'] = location.tuple[1]