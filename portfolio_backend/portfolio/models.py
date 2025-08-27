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
    name = models.CharField(max_length=100, default='')
    email = models.EmailField(default='')
    phone = models.CharField(max_length=20, default='', blank=True)
    message = models.TextField(default='')
    created_at = models.DateTimeField(auto_now_add=True)

class SocialMediaDesign(models.Model):
    title = models.CharField(max_length=200, default='')
    description = models.TextField(default='')
    image = models.ImageField(upload_to='social_media/', blank=True, null=True)
    platform = models.CharField(max_length=50, default='')  # Instagram, Facebook, etc.
    created_at = models.DateTimeField(auto_now_add=True)

class PrintDesign(models.Model):
    title = models.CharField(max_length=200, default='')
    description = models.TextField(default='')
    image = models.ImageField(upload_to='print_designs/', blank=True, null=True)
    category = models.CharField(max_length=50, default='')  # Packaging, Label, Brochure, etc.
    created_at = models.DateTimeField(auto_now_add=True)

class Order(models.Model):
    service_name = models.CharField(max_length=100)
    price = models.CharField(max_length=50)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    project_details = models.TextField()
    payment_status = models.CharField(max_length=20, default='pending')
    khalti_token = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.service_name} - {self.name}"