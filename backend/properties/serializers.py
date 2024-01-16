from rest_framework import serializers
from .models import PropertiesImage , Property ,City , Amenity
from agencies.serializers import AgencySerializer

class CitySerialiser(serializers.ModelSerializer):
    class Meta:
        model = City
        fields= '__all__'

class AmenitySerialiser(serializers.ModelSerializer):
    class Meta:
        model = Amenity
        fields= '__all__'

class PropertiesImageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    class Meta:
        model = PropertiesImage
        fields = ['id','property', 'image']

    def get_image(self,obj):
        request = self.context.get('request')
        image_url = obj.image.url
        return request.build_absolute_uri(image_url)


class CreatePropertySerializer(serializers.ModelSerializer):    
    images = PropertiesImageSerializer(many=True,read_only=True)   
    amenities = AmenitySerialiser(many=True,read_only=True)   
    city = serializers.PrimaryKeyRelatedField(queryset=City.objects.all(),many=False)  
    class Meta:
        model = Property
        fields = [
            'id',
            'title',
            'description',                      
            'category',                      
            'property_type',            
            'city',
            'price',
            'price_per',
            'total_area',
            'amenities',                    
            'rooms',           
            'latitude',
            'longitude',
            'images',
            'created_at'
        ]                     
       
    def validate(self, attrs):
        request = self.context.get('request')
        files = request.FILES.getlist('images') 
        if len(files) == 0 :
            raise serializers.ValidationError({
                'images':'Property Must have an image'
            })
        return super().validate(attrs)
    
class UpdatePropertySerializer(serializers.ModelSerializer):
    images = PropertiesImageSerializer(many=True,read_only=True)  
    city = serializers.PrimaryKeyRelatedField(queryset=City.objects.all(),many=False)      
    class Meta:
        model = Property 
                         
        fields = [
            'id','title','description','area','borough','property_type','property_status','city',
            'price','rental_frequency','rooms','furnished','pool','elevator','cctv','parking',
            'latitude','longitude',
            'images'
        ]  


class ProperytSerializer(serializers.ModelSerializer):
    agency = AgencySerializer()
    city = CitySerialiser()
    amenities = AmenitySerialiser(many=True)
    images = PropertiesImageSerializer(many=True)        
    class Meta:
        model = Property                  
        fields = [
            'id',
            'title',
            'description',                      
            'category',                      
            'property_type',            
            'city',
            'price',
            'price_per',
            'total_area',
            'amenities',                    
            'rooms',           
            'agency',
            'latitude',
            'longitude',
            'images',
            'created_at'
        ]   


        