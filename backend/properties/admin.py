from django.contrib import admin
from .models import Agency, Property , PropertiesImage ,City,Amenity,Commune


class AmenityAdmin(admin.ModelAdmin):
     list_display = ['id','name']

   
class CityAdmin(admin.ModelAdmin):
     list_display = ['id','name','lat', 'lng']

class CommuneAdmin(admin.ModelAdmin):
     list_display = ['id','name','lat', 'lng']

   
class PropertyImageInline(admin.TabularInline):
    model = PropertiesImage
    

class PropertiesImageAdmin(admin.ModelAdmin):
     list_display = ['property','image']

class PropertyAdmin(admin.ModelAdmin):
    # form = PropertyForm
    list_display = ['id','title','agency']
    # inlines = [PropertyImageInline,]


admin.site.register(Amenity,AmenityAdmin)
admin.site.register(Property,PropertyAdmin)
admin.site.register(PropertiesImage,PropertiesImageAdmin)
admin.site.register(City,CityAdmin)
admin.site.register(Commune,CityAdmin)

