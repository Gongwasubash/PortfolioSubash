from django.contrib import admin
from .models import Project, Video, Contact, SocialMediaDesign, PrintDesign, Order

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'created_at']
    list_filter = ['category', 'created_at']
    search_fields = ['title', 'description']

@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):
    list_display = ['title', 'video_preview', 'thumbnail_preview', 'created_at']
    search_fields = ['title']
    actions = ['delete_selected']
    list_filter = ['created_at']
    
    def video_preview(self, obj):
        if obj.video_file:
            return f'<video width="100" height="60" controls><source src="{obj.video_file.url}" type="video/mp4"></video>'
        return 'No Video'
    video_preview.allow_tags = True
    video_preview.short_description = 'Video Preview'
    
    def thumbnail_preview(self, obj):
        if obj.thumbnail:
            return f'<img src="{obj.thumbnail.url}" width="50" height="50" style="object-fit: cover;"/>'
        return 'No Thumbnail'
    thumbnail_preview.allow_tags = True
    thumbnail_preview.short_description = 'Thumbnail'
    
    def delete_selected(self, request, queryset):
        count = queryset.count()
        queryset.delete()
        self.message_user(request, f'{count} videos deleted successfully.')
    delete_selected.short_description = 'Delete selected videos'

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'phone', 'message', 'created_at']
    readonly_fields = ['name', 'email', 'phone', 'message', 'created_at']
    list_filter = ['created_at']
    
    def has_add_permission(self, request):
        return False
    
    def has_change_permission(self, request, obj=None):
        return False

@admin.register(SocialMediaDesign)
class SocialMediaDesignAdmin(admin.ModelAdmin):
    list_display = ['title', 'platform', 'created_at', 'image_preview']
    list_filter = ['platform', 'created_at']
    search_fields = ['title', 'description']
    actions = ['delete_selected']
    list_editable = ['platform']
    
    def image_preview(self, obj):
        if obj.image:
            return f'<img src="{obj.image.url}" width="50" height="50" style="object-fit: cover;"/>'
        return 'No Image'
    image_preview.allow_tags = True
    image_preview.short_description = 'Preview'
    
    def delete_selected(self, request, queryset):
        count = queryset.count()
        queryset.delete()
        self.message_user(request, f'{count} designs deleted successfully.')
    delete_selected.short_description = 'Delete selected designs'

@admin.register(PrintDesign)
class PrintDesignAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'created_at', 'image_preview']
    list_filter = ['category', 'created_at']
    search_fields = ['title', 'description']
    actions = ['delete_selected']
    list_editable = ['category']
    
    def image_preview(self, obj):
        if obj.image:
            return f'<img src="{obj.image.url}" width="50" height="50" style="object-fit: cover;"/>'
        return 'No Image'
    image_preview.allow_tags = True
    image_preview.short_description = 'Preview'
    
    def delete_selected(self, request, queryset):
        count = queryset.count()
        queryset.delete()
        self.message_user(request, f'{count} print designs deleted successfully.')
    delete_selected.short_description = 'Delete selected print designs'

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['service_name', 'name', 'email', 'phone', 'price', 'payment_status', 'created_at']
    readonly_fields = ['service_name', 'name', 'email', 'phone', 'price', 'project_details', 'payment_status', 'khalti_token', 'created_at']
    list_filter = ['service_name', 'payment_status', 'created_at']
    search_fields = ['name', 'email', 'service_name']
    
    def has_add_permission(self, request):
        return False
    
    def has_change_permission(self, request, obj=None):
        return False
