from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail
from django.conf import settings
from .models import Project, Video, Contact, SocialMediaDesign, PrintDesign
import json
from datetime import datetime

def home(request):
    social_media_designs = SocialMediaDesign.objects.all()[:3]  # Get first 3 designs
    context = {
        'social_media_designs': social_media_designs
    }
    return render(request, 'portfolio/index.html', context)

def videos(request):
    videos = Video.objects.all()
    context = {
        'videos': videos
    }
    return render(request, 'portfolio/videos.html', context)

def social_media(request):
    social_media_designs = SocialMediaDesign.objects.all()
    context = {
        'social_media_designs': social_media_designs
    }
    return render(request, 'portfolio/social-media.html', context)

def printing(request):
    print_designs = PrintDesign.objects.all()
    context = {
        'print_designs': print_designs
    }
    return render(request, 'portfolio/printing.html', context)

def services(request):
    return render(request, 'portfolio/services.html')

def projects_api(request):
    projects = Project.objects.all().values()
    return JsonResponse(list(projects), safe=False)

def videos_api(request):
    videos = Video.objects.all().values()
    return JsonResponse(list(videos), safe=False)

@csrf_exempt
def contact_api(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            
            # Save to database
            contact = Contact.objects.create(
                name=data['name'],
                email=data['email'],
                phone=data.get('phone', ''),
                message=data['message']
            )
            
            # Send email notification
            subject = f"New Contact Form Submission from {data['name']}"
            message = f"""
New contact form submission:

Name: {data['name']}
Email: {data['email']}
Phone: {data.get('phone', 'Not provided')}
Message: {data['message']}

Submitted at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
            """
            
            send_mail(
                subject,
                message,
                'subashgongwanepal@gmail.com',
                ['subashgongwanepal@gmail.com'],
                fail_silently=True,
            )
            
            return JsonResponse({'status': 'success'})
            
        except Exception as e:
            print(f"Contact form error: {e}")
            return JsonResponse({'status': 'error', 'message': str(e)})
    
    return JsonResponse({'status': 'error', 'message': 'Invalid request method'})

@csrf_exempt
def send_email(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            
            subject = f"Portfolio Contact: {data['subject']}"
            message = f"""
New message from your portfolio:

Name: {data['name']}
Email: {data['email']}
Subject: {data['subject']}
Message:
{data['message']}
            """
            
            send_mail(
                subject,
                message,
                data['email'],
                ['subashgongwanepal@gmail.com'],
                fail_silently=False,
            )
            
            return JsonResponse({'success': True})
            
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    
    return JsonResponse({'error': 'Invalid method'}, status=405)

def social_media_api(request):
    designs = SocialMediaDesign.objects.all().values()
    return JsonResponse(list(designs), safe=False)