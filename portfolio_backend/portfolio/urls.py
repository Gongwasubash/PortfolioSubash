from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('videos.html', views.videos, name='videos'),
    path('social-media.html', views.social_media, name='social_media'),
    path('printing.html', views.printing, name='printing'),
    path('services.html', views.services, name='services'),
    path('api/projects/', views.projects_api, name='projects_api'),
    path('api/videos/', views.videos_api, name='videos_api'),
    path('api/contact/', views.contact_api, name='contact_api'),
    path('api/social-media/', views.social_media_api, name='social_media_api'),
]