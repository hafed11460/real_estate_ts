from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from project.views import AboutUs
from properties.views import CitiesListAPI

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/cities/', CitiesListAPI.as_view(),name='cities'),
    # path('api/',include('project.router')),
    path('api/auth/',include('users.urls')),
    path('api/properties/', include('properties.urls')),
    path('api/agencies/', include('agencies.urls')),
    # path('',AboutUs.as_view() ),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


urlpatterns += [re_path(r'^.*',TemplateView.as_view(template_name='index.html'))]