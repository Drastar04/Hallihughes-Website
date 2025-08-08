from django.contrib import admin
from .models import Project, Quote

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'client_name', 'project_type', 'status', 'created_at']
    list_filter = ['project_type', 'status', 'created_at']
    search_fields = ['title', 'client_name', 'description', 'location']
    readonly_fields = ['created_at', 'updated_at']
    fieldsets = (
        ('Project Information', {
            'fields': ('title', 'description', 'project_type', 'status')
        }),
        ('Client Information', {
            'fields': ('client_name', 'client_email', 'client_phone')
        }),
        ('Project Details', {
            'fields': ('location', 'budget', 'start_date', 'end_date', 'assigned_to')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

@admin.register(Quote)
class QuoteAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'email', 'service_required', 'status', 'created_at']
    list_filter = ['service_required', 'status', 'created_at']
    search_fields = ['first_name', 'last_name', 'email', 'project_description', 'location']
    readonly_fields = ['created_at', 'updated_at']
    fieldsets = (
        ('Customer Information', {
            'fields': ('first_name', 'last_name', 'email', 'phone')
        }),
        ('Project Details', {
            'fields': ('service_required', 'project_description', 'location', 'timeline', 'budget_range', 'additional_notes')
        }),
        ('Quote Management', {
            'fields': ('status', 'admin_notes', 'quote_amount', 'quote_valid_until', 'reviewed_by')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
