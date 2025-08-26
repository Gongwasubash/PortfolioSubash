from django.db import models

class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='projects/')
    category = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

class Video(models.Model):
    title = models.CharField(max_length=200)
    video_file = models.FileField(upload_to='videos/')
    thumbnail = models.ImageField(upload_to='thumbnails/')
    created_at = models.DateTimeField(auto_now_add=True)

class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

class SocialMediaDesign(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='social_media/')
    platform = models.CharField(max_length=50)  # Instagram, Facebook, etc.
    created_at = models.DateTimeField(auto_now_add=True)

class PrintDesign(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='print_designs/')
    category = models.CharField(max_length=50)  # Packaging, Label, Brochure, etc.
    created_at = models.DateTimeField(auto_now_add=True)