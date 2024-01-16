from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.owner == request.user



class IsOwner(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return True

    def has_object_permission(self, request, view, obj):        
        if obj.agency.saller == request.user:
            return True
        return False
    
class IsUserAgency(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_authenticated and request.user.role=='VENDOR' :
            return True
        return False

    def has_object_permission(self, request, view, obj):
        if request.user.role == 'VENDOR':
            return True
        return False
