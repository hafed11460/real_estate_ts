from rest_framework import serializers
from agencies.models import Agency 
from django.contrib.gis.geos import Point 

class AgencySerializer(serializers.ModelSerializer):
    logo = serializers.SerializerMethodField()
    # cover = serializers.SerializerMethodField()
    class Meta:
        model = Agency
        fields = ['id', 'name','logo','phone','bio']

    def get_logo(self,obj):
        request = self.context.get('request')
        image_url = obj.logo.url
        return request.build_absolute_uri(image_url)
    
    


class UpdateAgencySerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=150)
    phone = serializers.CharField(max_length=20)
    class Meta:
        model = Agency
        fields = ['id', 'name','logo','phone','bio']