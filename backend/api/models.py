from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Project(models.Model):
    PROJECT_TYPES = [
        ('borehole', 'Borehole Drilling'),
        ('water_treatment', 'Water Treatment'),
        ('geological_survey', 'Geological Survey'),
        ('environmental', 'Environmental Assessment'),
    ]
    
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]
    
    title = models.CharField(max_length=200)
    description = models.TextField()
    project_type = models.CharField(max_length=50, choices=PROJECT_TYPES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    client_name = models.CharField(max_length=200)
    client_email = models.EmailField()
    client_phone = models.CharField(max_length=20, blank=True)
    location = models.CharField(max_length=500)
    budget = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    assigned_to = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.title} - {self.client_name}"

class Quote(models.Model):
    SERVICE_CHOICES = [
        ('borehole-drilling', 'Borehole Drilling'),
        ('water-treatment', 'Water Treatment'),
        ('hydrogeological-survey', 'Hydrogeological Survey'),
        ('site-investigation', 'Site Investigation'),
        ('environmental-assessment', 'Environmental Assessment'),
        ('geological-mapping', 'Geological Mapping'),
    ]
    
    STATUS_CHOICES = [
        ('pending', 'Pending Review'),
        ('reviewing', 'Under Review'),
        ('quoted', 'Quote Sent'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
        ('expired', 'Expired'),
        ('resolved', 'Resolved'),
    ]
    
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    service_required = models.CharField(max_length=50, choices=SERVICE_CHOICES)
    project_description = models.TextField()
    location = models.CharField(max_length=500)
    timeline = models.CharField(max_length=200, blank=True)
    budget_range = models.CharField(max_length=100, blank=True)
    budget_currency = models.CharField(max_length=3, default='USD', choices=[
        ('USD', 'US Dollar'),
        ('EUR', 'Euro'),
        ('GBP', 'British Pound'),
        ('NGN', 'Nigerian Naira'),
        ('CAD', 'Canadian Dollar'),
        ('AUD', 'Australian Dollar'),
        ('JPY', 'Japanese Yen'),
        ('CHF', 'Swiss Franc'),
        ('CNY', 'Chinese Yuan'),
        ('INR', 'Indian Rupee'),
    ])
    additional_notes = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    admin_notes = models.TextField(blank=True)
    quote_amount = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    quote_currency = models.CharField(max_length=3, default='USD', choices=[
        ('USD', 'US Dollar'),
        ('EUR', 'Euro'),
        ('GBP', 'British Pound'),
        ('NGN', 'Nigerian Naira'),
        ('CAD', 'Canadian Dollar'),
        ('AUD', 'Australian Dollar'),
        ('JPY', 'Japanese Yen'),
        ('CHF', 'Swiss Franc'),
        ('CNY', 'Chinese Yuan'),
        ('INR', 'Indian Rupee'),
    ])
    quote_valid_until = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    reviewed_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Quote for {self.first_name} {self.last_name} - {self.service_required}"
    
    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"
