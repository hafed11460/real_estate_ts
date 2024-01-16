from django.contrib import admin
from django.urls import path
from .views import UserAgencySettingsAPIView,AgencyListAPIView , AgencyDetailAPIView

urlpatterns = [
    path('settings/', UserAgencySettingsAPIView.as_view(), name='agency-settings'),
    path('', AgencyListAPIView.as_view(), name='agency-list'),
    path('<int:pk>/', AgencyDetailAPIView.as_view(), name='agency-detail'),
]