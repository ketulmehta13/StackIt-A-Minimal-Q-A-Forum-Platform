# user_profile/serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    """
    Serializer for the UserProfile model.
    Includes fields from the related User model for a complete profile view.
    """
    # Read-only fields from the User model
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)
    join_date = serializers.DateTimeField(source='user.date_joined', read_only=True)

    class Meta:
        model = UserProfile
        fields = [
            'id', 'username', 'email', 'display_name', 'bio', 'location',
            'website', 'github', 'twitter', 'reputation', 'questions_count',
            'answers_count', 'badges_count', 'upvotes_count',
            'accepted_answers_count', 'join_date'
            # 'profile_picture', # Uncomment if you implement image field
        ]
        read_only_fields = ['id', 'username', 'email', 'join_date',
                            'reputation', 'questions_count', 'answers_count',
                            'badges_count', 'upvotes_count', 'accepted_answers_count']
        # 'user' field is implicitly handled by the OneToOneField relationship and source='user.field'

