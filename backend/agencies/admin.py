from django.contrib import admin
from .models import Agency


class AgencyAdmin(admin.ModelAdmin):
    list_display = ['id','saller','name','phone', 'created_at','updated_at','deleted_at']
 
    

admin.site.register(Agency, AgencyAdmin)