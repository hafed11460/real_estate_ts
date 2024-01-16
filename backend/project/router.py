

from rest_framework.routers import DefaultRouter, SimpleRouter
from project import settings
from agencies.api.views import ProperiesViewSet,AgenciesViewSet

if settings.DEBUG:
    router = DefaultRouter()
else:
    router = SimpleRouter()

router.register('agencies', AgenciesViewSet, basename='agencies')
router.register('properties', ProperiesViewSet, basename='properties')


urlpatterns = router.urls
