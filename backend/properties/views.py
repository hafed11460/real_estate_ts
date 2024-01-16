from django.shortcuts import render
from rest_framework import generics
from rest_framework.generics import GenericAPIView
from rest_framework.views import APIView
from .models import PropertiesImage , Property,City ,Amenity
from .serializers import (
    CitySerialiser ,
    ProperytSerializer, 
    CreatePropertySerializer,
    UpdatePropertySerializer,
    AmenitySerialiser
)
from .paginations import PropertiesPaginations
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from .permissions import IsOwner ,IsUserAgency
from rest_framework.exceptions import NotFound
from rest_framework.parsers import JSONParser
import json

class CitiesListAPI(generics.ListAPIView):
    serializer_class = CitySerialiser
    queryset = City.objects.all()


class AgencyPropertyListAPIView(generics.ListAPIView):
    permission_classes = [IsUserAgency,IsAuthenticated]
    serializer_class = ProperytSerializer
    queryset = Property.objects.all()
    def get_queryset(self):
        user = self.request.user
        return Property.objects.filter(agency=user.agency,active=True)

class PropertyListAPIView(generics.ListAPIView):
    serializer_class = ProperytSerializer
    pagination_class = PropertiesPaginations
    filterset_fields = {
        'city':['exact'],
        'category':['exact'],
        'created_at':['range','exact'],
        'title' :['icontains'],
        'property_type':['in']
    }
    def get_queryset(self):
        return Property.objects.filter(active=True)
    


class CreatePropertyAPIView(GenericAPIView):
    permission_classes = [IsAuthenticated,IsUserAgency]
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = CreatePropertySerializer
    queryset = Property.objects.all()

    def post(self,request):
        # print('-------------------------------')
        # print(request.FILES.getlist('images'))
        # print('-------------------------------')
        files = self.request.FILES.getlist('images') 
        serializer = CreatePropertySerializer(data=request.data,context={'request':request})
        serializer.is_valid(raise_exception=True)  
        user = self.request.user     
        amenities = json.loads(self.request.POST['amenities'])
                
        property = serializer.save(agency=user.agency,user=user) 
        if isinstance(amenities, list):
            for amenity_id in amenities:
                try:
                    amenity = Amenity.objects.get(id=amenity_id)
                    property.amenities.add(amenity)
                except Amenity.DoesNotExist:
                    raise NotFound()              
        for file in files:
            image = PropertiesImage(image=file, property=property)
            image.save()
        return Response(serializer.data,status=status.HTTP_200_OK)
    
class DetailPropertyAPIView(generics.RetrieveAPIView):
    # permission_classes = [IsAuthenticated,IsOwner,IsUserAgency]
    serializer_class = ProperytSerializer
    queryset = Property.objects.all()


class UpdatePropertyAPIView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated,IsOwner,IsUserAgency]
    serializer_class = UpdatePropertySerializer
    queryset = Property.objects.all()

class DeletePropertyAPIView(generics.DestroyAPIView):
    permission_classes =  [IsAuthenticated,IsOwner,IsUserAgency]
    serializer_class = ProperytSerializer
    queryset = Property.objects.all()

    def delete(self, request,pk, *args, **kwargs):       
        p = Property.objects.get(pk=pk)
        p.active = False
        p.save()

        return Response(status=status.HTTP_204_NO_CONTENT)
    

class AmenityListAPIView(generics.ListAPIView):
    serializer_class = AmenitySerialiser
    queryset = Amenity.objects.all()