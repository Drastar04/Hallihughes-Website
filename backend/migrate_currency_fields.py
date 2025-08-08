#!/usr/bin/env python
import os
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hallihughes_backend.settings')
django.setup()

from api.models import Quote

def migrate_currency_fields():
    """Add currency fields to existing quotes"""
    print("Adding currency fields to existing quotes...")
    
    # Update existing quotes to have default currency values
    quotes_without_currency = Quote.objects.filter(quote_currency__isnull=True)
    if quotes_without_currency.exists():
        quotes_without_currency.update(quote_currency='USD')
        print(f"Updated {quotes_without_currency.count()} quotes with default USD currency")
    
    quotes_without_budget_currency = Quote.objects.filter(budget_currency__isnull=True)
    if quotes_without_budget_currency.exists():
        quotes_without_budget_currency.update(budget_currency='USD')
        print(f"Updated {quotes_without_budget_currency.count()} quotes with default USD budget currency")
    
    print("Currency migration completed successfully!")

if __name__ == '__main__':
    migrate_currency_fields() 