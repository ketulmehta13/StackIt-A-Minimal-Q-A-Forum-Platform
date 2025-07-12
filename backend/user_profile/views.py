# user_profile/views.py
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .models import UserProfile
from .serializers import UserProfileSerializer

class UserProfileViewSet(viewsets.ModelViewSet):
    """
    A ViewSet for viewing and editing UserProfile instances.
    Provides endpoints for:
    - GET /api/user_profile/me/ (retrieve current user's profile)
    - PUT/PATCH /api/user_profile/me/ (update current user's profile)
    - GET /api/user_profile/{id}/ (retrieve any user's profile - read-only for others)
    """
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated] # Requires authentication for all actions

    def get_object(self):
        """
        Custom get_object to handle 'me' lookup and ensure object ownership.
        """
        lookup_url_kwarg = self.lookup_url_kwarg or self.lookup_field
        
        if lookup_url_kwarg == 'pk' and self.kwargs.get(lookup_url_kwarg) == 'me':
            # If 'me' is requested, return the current user's profile
            return get_object_or_404(UserProfile, user=self.request.user)
        
        # For other cases (e.g., /user_profile/{id}/), use default lookup
        obj = super().get_object()
        return obj

    def get_queryset(self):
        """
        Allows superusers to see all profiles, but regular users only their own.
        """
        if self.request.user.is_superuser:
            return UserProfile.objects.all()
        # For regular users, only allow access to their own profile
        return UserProfile.objects.filter(user=self.request.user)

    def retrieve(self, request, *args, **kwargs):
        """
        Allows authenticated users to retrieve their own profile or
        any other user's profile (read-only for others).
        """
        instance = self.get_object()
        
        # Ensure a user can only edit their own profile, but can view others
        if instance.user != request.user and not request.user.is_superuser:
            # If not the owner and not superuser, return read-only data
            # You might want to restrict fields here if needed
            serializer = self.get_serializer(instance)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        """
        Allows authenticated users to update only their own profile.
        """
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        # Only the owner or superuser can update the profile
        if instance.user != request.user and not request.user.is_superuser:
            return Response({"detail": "You do not have permission to edit this profile."}, status=status.HTTP_403_FORBIDDEN)
        
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)

    def partial_update(self, request, *args, **kwargs):
        """
        Allows authenticated users to partial update only their own profile.
        """
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        """
        Disallow direct creation of UserProfile via this endpoint.
        Profiles are created automatically via signals on User creation.
        """
        return Response({"detail": "User profiles are created automatically upon user registration."},
                        status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def destroy(self, request, *args, **kwargs):
        """
        Disallow deletion of UserProfile via this endpoint.
        Profiles are deleted automatically when the associated User is deleted.
        """
        return Response({"detail": "User profiles cannot be deleted directly. Delete the associated user account."},
                        status=status.HTTP_405_METHOD_NOT_ALLOWED)

