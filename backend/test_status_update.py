#!/usr/bin/env python
import os
import django
import requests
import json

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hallihughes_backend.settings')
django.setup()

def test_status_update():
    """Test status update functionality"""
    base_url = "http://localhost:8000/api"
    
    print("Testing Status Update...")
    
    # First, get an existing quote
    print("1. Getting existing quote...")
    response = requests.get(f"{base_url}/quotes/1/")
    print(f"   Status: {response.status_code}")
    
    if response.status_code == 200:
        quote_data = response.json()
        print(f"   Quote found: {quote_data['first_name']} {quote_data['last_name']}")
        print(f"   Current status: {quote_data['status']}")
        print(f"   Service: {quote_data['service_required']}")
        
        # Test updating status
        print("2. Testing status update...")
        new_status = 'reviewing'
        update_data = {'status': new_status}
        
        print(f"   Updating to status: {new_status}")
        print(f"   Update data: {json.dumps(update_data)}")
        
        response = requests.patch(
            f"{base_url}/quotes/1/", 
            json=update_data,
            headers={'Content-Type': 'application/json'}
        )
        
        print(f"   Response status: {response.status_code}")
        print(f"   Response text: {response.text}")
        
        if response.status_code == 200:
            result = response.json()
            print(f"   Success! New status: {result['status']}")
        else:
            print(f"   Error: {response.text}")
    else:
        print(f"   Error getting quote: {response.text}")

if __name__ == '__main__':
    test_status_update() 