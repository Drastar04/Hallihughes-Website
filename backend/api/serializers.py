from rest_framework import serializers
from .models import Project, Quote

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = [
            'id', 'title', 'description', 'project_type', 'status',
            'client_name', 'client_email', 'client_phone', 'location',
            'budget', 'start_date', 'end_date', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

class QuoteSerializer(serializers.ModelSerializer):
    full_name = serializers.ReadOnlyField()
    
    class Meta:
        model = Quote
        fields = [
            'id', 'first_name', 'last_name', 'full_name', 'email', 'phone',
            'service_required', 'project_description', 'location', 'timeline',
            'budget_range', 'additional_notes', 'status', 'admin_notes',
            'quote_amount', 'quote_valid_until', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at'] 