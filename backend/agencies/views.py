from rest_framework import generics
from agencies.models import Agency
from .serializers import  AgencySerializer,UpdateAgencySerializer
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from agencies.permissions import IsOwner
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView


class AgencyListAPIView(generics.ListAPIView):
    serializer_class = AgencySerializer
    def get_queryset(self):
        return Agency.objects.all() #filter(active=True)


class AgencyDetailAPIView(generics.RetrieveAPIView):
    serializer_class = AgencySerializer
    queryset = Agency.objects.all()

class UserAgencySettingsAPIView(APIView):
    permission_classes= [IsAuthenticated,IsOwner]
    def get(self, request,format=None):
        user = self.request.user
        if user.role == "VENDOR":
            agency =  Agency.objects.get(saller=user)
            serializer = AgencySerializer(agency,context={'request':request})
            return Response(serializer.data,status=status.HTTP_200_OK)        
        return Response(status=status.HTTP_204_NO_CONTENT)        
    
    def put(self, request,format=None):
        user = self.request.user
        agency =  Agency.objects.get(saller=user)
        serializer = UpdateAgencySerializer(agency, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# class PermissionPolicyMixin:
#     def check_permissions(self, request):
#         try:
#             # This line is heavily inspired from `APIView.dispatch`.
#             # It returns the method associated with an endpoint.
#             handler = getattr(self, request.method.lower())
#         except AttributeError:
#             handler = None

#         if (
#             handler
#             and self.permission_classes_per_method
#             and self.permission_classes_per_method.get(handler.__name__)
#         ):
#             self.permission_classes = self.permission_classes_per_method.get(
#                 handler.__name__)

#         super().check_permissions(request)

# class AgenciesViewSet(PermissionPolicyMixin, ModelViewSet):
#     queryset = Agency.objects.all()
#     serializer_class = ProperytSerializer

#     @action(methods=['get'], detail=False, url_path='agency-info', url_name='agency-info',)
#     def agency_info(self, request):
        
#         agency = self.queryset.filter(saller=request.user)
#         serializer = self.get_serializer(posts, many=True)
#         return Response(serializer.data,
#                         status=status.HTTP_200_OK)
    
#     @action(methods=['get'], detail=False, url_path='agency-properties', url_name='agency-properties',)
#     def agency_properties(self, request):
#         print(request.user)
#         posts = self.queryset.filter(agency=request.user.agency)
#         serializer = self.get_serializer(posts, many=True)
#         return Response(serializer.data,
#                         status=status.HTTP_200_OK)
    

# class ProperiesViewSet(PermissionPolicyMixin, ModelViewSet):
#     # permission_classes=[IsAuthenticated]
#     parser_classes = (MultiPartParser, FormParser)
#     permission_classes_per_method = {
#         # except for list and retrieve where both users with "write" or "read-only"
#         # permissions can access the endpoints.
#         "list": [], #[IsAuthenticated],
#         "retrieve": [IsAuthenticated],
#         "update": [IsAuthenticated, IsOwner],
#     }

#     serializer_class = ProperytSerializer
#     queryset = Property.objects.all()

#     def perform_create(self, serializer):
#         files = self.request.FILES.getlist('images')  
#         serializer.is_valid(raise_exception=True)     
#         property = serializer.save(agency=self.request.user.agency)                
#         for file in files:
#             image = PropertiesImage(image=file, property=property)
#             image.save()

#     def get_queryset(self):
#         return self.queryset.all()
#         # return  self.queryset.filter(owner=self.request.user)

   

#     @action(methods=['get'], detail=False, url_path='agency-properties', url_name='agency-properties',)
#     def agency_properties(self, request):
#         print(request.user)
#         posts = self.queryset.filter(agency=request.user.agency)
#         serializer = self.get_serializer(posts, many=True)
#         return Response(serializer.data,
#                         status=status.HTTP_200_OK)
       


# class CitiesListAPI(generics.ListAPIView):
#     serializer_class = CitySerialiser
#     queryset = Wilaya.objects.all()



# class AgencyPropertiesListAPI(generics.ListAPIView):
#     serializer_class = ProperytSerializer
#     queryset = Property.objects.all()