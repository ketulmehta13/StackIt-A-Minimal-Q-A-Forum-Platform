# user_profile/models.py
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class UserProfile(models.Model):
    """
    Extends the built-in Django User model with additional profile information.
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')

    # Basic Profile Information
    display_name = models.CharField(max_length=255, blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=100, blank=True, null=True)
    
    # Social Links
    website = models.URLField(max_length=200, blank=True, null=True)
    github = models.CharField(max_length=100, blank=True, null=True)
    twitter = models.CharField(max_length=100, blank=True, null=True)

    # User Statistics (initialize with 0)
    reputation = models.IntegerField(default=1) # Start with 1 reputation
    questions_count = models.IntegerField(default=0)
    answers_count = models.IntegerField(default=0)
    badges_count = models.IntegerField(default=0)
    upvotes_count = models.IntegerField(default=0)
    accepted_answers_count = models.IntegerField(default=0)

    # Profile Picture (optional, for later implementation)
    # profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)

    def __str__(self):
        return f"{self.user.username}'s Profile"

# Signal to automatically create a UserProfile when a new User is created
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance, display_name=instance.username) # Set display_name to username by default

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

