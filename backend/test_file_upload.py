#!/usr/bin/env python
import os
import django
import requests

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hallihughes_backend.settings')
django.setup()

def test_file_upload():
    """Test file upload with quote email"""
    base_url = "http://localhost:8000/api"
    
    print("Testing File Upload with Quote Email...")
    
    # First, get an existing quote
    print("1. Getting existing quote...")
    response = requests.get(f"{base_url}/quotes/1/")
    print(f"   Status: {response.status_code}")
    
    if response.status_code == 200:
        quote_data = response.json()
        print(f"   Quote found: {quote_data['first_name']} {quote_data['last_name']}")
        
        # Test sending quote with file upload
        print("2. Testing quote email with file upload...")
        
        # Create a simple test file
        test_file_content = "This is a test quote document for Halli Hughes."
        with open('test_quote.txt', 'w') as f:
            f.write(test_file_content)
        
        # Send quote with file
        with open('test_quote.txt', 'rb') as f:
            files = {'document': ('test_quote.txt', f, 'text/plain')}
            response = requests.post(f"{base_url}/quotes/1/send-quote/", files=files)
        
        print(f"   Status: {response.status_code}")
        if response.status_code == 200:
            result = response.json()
            print(f"   Result: {result}")
        else:
            print(f"   Error: {response.text}")
        
        # Clean up test file
        if os.path.exists('test_quote.txt'):
            os.remove('test_quote.txt')
    else:
        print(f"   Error getting quote: {response.text}")

if __name__ == '__main__':
    test_file_upload() 