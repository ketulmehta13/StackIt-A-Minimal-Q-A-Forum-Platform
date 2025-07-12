# accounts/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterView, LoginView, UserViewSet

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'users', UserViewSet) # This will create routes like /api/accounts/users/, /api/accounts/users/{id}/

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('', include(router.urls)), # Include the router's URLs
]