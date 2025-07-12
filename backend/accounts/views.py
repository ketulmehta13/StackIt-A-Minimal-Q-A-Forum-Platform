# accounts/views.py
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .serializers import RegisterSerializer, LoginSerializer, UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    """
    A ViewSet for viewing and editing user instances.
    Provides 'list', 'retrieve', 'update', 'partial_update', 'destroy' actions.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated] # Only authenticated users can access user data

    # Override get_queryset to allow users to only see/edit their own profile
    def get_queryset(self):
        if self.request.user.is_superuser:
            return User.objects.all()
        return User.objects.filter(id=self.request.user.id)

    # Override retrieve to ensure a user can only retrieve their own details
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        if not request.user.is_superuser and instance.id != request.user.id:
            return Response({"detail": "You do not have permission to access this user's data."}, status=status.HTTP_403_FORBIDDEN)
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    # Override destroy, create (for ViewSet) as registration is handled separately
    # Default create/destroy actions on UserViewSet are generally not desired for direct user manipulation
    def create(self, request, *args, **kwargs):
        # Registration is handled by RegisterView, so we don't allow create via UserViewSet
        return Response({"detail": "User creation is handled by the /register/ endpoint."}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if not request.user.is_superuser and instance.id != request.user.id:
            return Response({"detail": "You do not have permission to delete this user."}, status=status.HTTP_403_FORBIDDEN)
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)


class RegisterView(APIView):
    """
    API endpoint for user registration (signup).
    Allows new users to create an account.
    """
    permission_classes = (AllowAny,) # Anyone can register

    def post(self, request, *args, **kwargs):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save() # The serializer's create method will handle user creation
        
        # Automatically generate a token for the new user upon successful registration
        token, created = Token.objects.get_or_create(user=user)
        
        return Response({
            "message": "Account created successfully. Please check your email to verify your account.",
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
            },
            "token": token.key
        }, status=status.HTTP_201_CREATED)

class LoginView(APIView):
    """
    API endpoint for user login.
    Authenticates user and returns an authentication token.
    """
    permission_classes = (AllowAny,) # Anyone can log in

    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        
        return Response({
            "message": "Login successful.",
            "token": token.key,
            "user_id": user.pk,
            "username": user.username,
            "email": user.email,
        }, status=status.HTTP_200_OK)