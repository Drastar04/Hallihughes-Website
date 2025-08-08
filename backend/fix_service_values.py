#!/usr/bin/env python
import os
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hallihughes_backend.settings')
django.setup()

from api.models import Quote

def fix_service_values():
    """Fix any quotes with incorrect service values"""
    print("Checking for quotes with incorrect service values...")
    
    # Find quotes with the old service value
    old_quotes = Quote.objects.filter(service_required='environmental-consulting')
    
    if old_quotes.exists():
        print(f"Found {old_quotes.count()} quotes with 'environmental-consulting'")
        
        # Update them to the correct value
        old_quotes.update(service_required='environmental-assessment')
        print("Updated quotes to use 'environmental-assessment'")
    else:
        print("No quotes found with incorrect service values")
    
    # Show all quotes and their services
    print("\nAll quotes and their services:")
    for quote in Quote.objects.all():
        print(f"  ID {quote.id}: {quote.first_name} {quote.last_name} - {quote.service_required}")

if __name__ == '__main__':
    fix_service_values() 