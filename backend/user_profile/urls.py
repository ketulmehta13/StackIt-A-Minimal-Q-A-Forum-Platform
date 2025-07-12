# user_profile/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserProfileViewSet

router = DefaultRouter()
router.register(r'profiles', UserProfileViewSet, basename='userprofile')

urlpatterns = [
    path('', include(router.urls)),
    # Custom route for the current user's profile
    path('profiles/me/', UserProfileViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update'}), name='userprofile-me'),
]
