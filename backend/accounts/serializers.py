# accounts/serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token

class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for the built-in Django User model.
    Used for retrieving and updating user details.
    """
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'date_joined')
        read_only_fields = ('id', 'username', 'email', 'date_joined') # Prevent direct update of these via user profile

class RegisterSerializer(serializers.ModelSerializer):
    """
    Serializer for user registration.
    Handles username, email, password, and password confirmation.
    """
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    confirmPassword = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'confirmPassword')
        extra_kwargs = {
            'username': {'required': True},
            'email': {'required': True},
        }

    def validate(self, data):
        """
        Validate that passwords match and meet basic requirements.
        """
        if data['password'] != data['confirmPassword']:
            raise serializers.ValidationError({"password": "Passwords do not match."})

        # Basic password strength validation (matching frontend)
        if len(data['password']) < 8:
            raise serializers.ValidationError({"password": "Password must be at least 8 characters long."})
        if not any(char.isupper() for char in data['password']):
            raise serializers.ValidationError({"password": "Password must contain at least one uppercase letter."})
        if not any(char.islower() for char in data['password']):
            raise serializers.ValidationError({"password": "Password must contain at least one lowercase letter."})
        if not any(char.isdigit() for char in data['password']):
            raise serializers.ValidationError({"password": "Password must contain at least one number."})
        
        # Check if email or username already exists
        if User.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError({"email": "This email is already registered."})
        if User.objects.filter(username=data['username']).exists():
            raise serializers.ValidationError({"username": "This username is already taken."})

        return data

    def create(self, validated_data):
        """
        Create and return a new 'User' instance, given the validated data.
        """
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        # You might want to send a verification email here in a real application
        return user

class LoginSerializer(serializers.Serializer):
    """
    Serializer for user login.
    Authenticates user with email and password and returns a token.
    """
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    token = serializers.CharField(read_only=True)

    def validate(self, data):
        """
        Authenticate the user using email and password.
        """
        email = data.get('email')
        password = data.get('password')

        if email and password:
            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                raise serializers.ValidationError("Invalid credentials.")

            user = authenticate(request=self.context.get('request'), username=user.username, password=password)

            if not user:
                raise serializers.ValidationError("Invalid credentials.")
        else:
            raise serializers.ValidationError("Must include 'email' and 'password'.")

        data['user'] = user
        return data