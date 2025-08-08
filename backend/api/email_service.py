from django.core.mail import EmailMessage
from django.conf import settings
import os

def send_quote_document(quote, uploaded_file=None):
    """
    Send quote document to customer
    """
    subject = f"Your Quote from Halli Hughes - {quote.service_required}"
    
    # Create HTML email content
    html_content = f"""
    <html>
    <body>
        <h2>Your Quote from Halli Hughes</h2>
        <p>Dear {quote.first_name} {quote.last_name},</p>
        
        <p>Thank you for your interest in our {quote.service_required} services.</p>
        
        <h3>Quote Details:</h3>
                            <ul>
                        <li><strong>Service:</strong> {quote.service_required}</li>
                        <li><strong>Location:</strong> {quote.location}</li>
                        <li><strong>Quote Amount:</strong> {f'{quote.quote_currency} {quote.quote_amount:,.2f}' if quote.quote_amount else 'To be determined'}</li>
                        <li><strong>Valid Until:</strong> {quote.quote_valid_until if quote.quote_valid_until else 'Not specified'}</li>
                    </ul>
        
        <h3>Project Description:</h3>
        <p>{quote.project_description}</p>
        
        {f'<h3>Admin Notes:</h3><p>{quote.admin_notes}</p>' if quote.admin_notes else ''}
        
        <p>Please review the attached quote document for complete details.</p>
        
        <p>If you have any questions or would like to proceed with this quote, please don't hesitate to contact us.</p>
        
        <p>Best regards,<br>
        The Halli Hughes Team</p>
    </body>
    </html>
    """
    
    # Create email message
    email = EmailMessage(
        subject=subject,
        body=html_content,
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[quote.email],
        reply_to=[settings.DEFAULT_FROM_EMAIL]
    )
    email.content_subtype = "html"  # Set content type to HTML
    
    # Attach uploaded file if provided
    if uploaded_file:
        email.attach(uploaded_file.name, uploaded_file.read(), uploaded_file.content_type)
    
    # Send email
    try:
        email.send()
        return True, "Quote document sent successfully"
    except Exception as e:
        return False, f"Failed to send email: {str(e)}"

def send_customer_message(quote, message):
    """
    Send a message to customer
    """
    subject = f"Message from Halli Hughes regarding your {quote.service_required} quote"
    
    # Create HTML email content
    html_content = f"""
    <html>
    <body>
        <h2>Message from Halli Hughes</h2>
        <p>Dear {quote.first_name} {quote.last_name},</p>
        
        <p>We have a message regarding your quote request for {quote.service_required} services.</p>
        
        <div style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #007bff; margin: 20px 0;">
            <h3>Message:</h3>
            <p>{message}</p>
        </div>
        
        <h3>Your Quote Details:</h3>
        <ul>
            <li><strong>Service:</strong> {quote.service_required}</li>
            <li><strong>Location:</strong> {quote.location}</li>
            <li><strong>Status:</strong> {quote.status}</li>
        </ul>
        
        <p>If you have any questions, please don't hesitate to contact us.</p>
        
        <p>Best regards,<br>
        The Halli Hughes Team</p>
    </body>
    </html>
    """
    
    # Create email message
    email = EmailMessage(
        subject=subject,
        body=html_content,
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[quote.email],
        reply_to=[settings.DEFAULT_FROM_EMAIL]
    )
    email.content_subtype = "html"  # Set content type to HTML
    
    # Send email
    try:
        email.send()
        return True, "Message sent successfully"
    except Exception as e:
        return False, f"Failed to send email: {str(e)}" 