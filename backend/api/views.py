from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from django.shortcuts import get_object_or_404
from .models import Project, Quote
from .serializers import ProjectSerializer, QuoteSerializer
from .email_service import send_quote_document, send_customer_message

@api_view(['GET'])
def root_view(request):
    """Root endpoint with API information"""
    return Response({
        'message': 'Welcome to Hallihughes Backend API',
        'version': '1.0.0',
        'endpoints': {
            'health': '/api/health/',
            'info': '/api/info/',
            'admin': '/admin/'
        },
        'description': 'Django REST API for Hallihughes geological and water solutions project'
    }, status=status.HTTP_200_OK)

@api_view(['GET'])
def health_check(request):
    """Health check endpoint"""
    return Response({
        'status': 'healthy',
        'message': 'Django backend is running successfully'
    }, status=status.HTTP_200_OK)

@api_view(['GET'])
def api_info(request):
    """API information endpoint"""
    return Response({
        'name': 'Hallihughes Backend API',
        'version': '1.0.0',
        'description': 'Django REST API for Hallihughes project'
    }, status=status.HTTP_200_OK)

class ProjectViewSet(ModelViewSet):
    """ViewSet for Project model"""
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class QuoteViewSet(ModelViewSet):
    """ViewSet for Quote model"""
    queryset = Quote.objects.all()
    serializer_class = QuoteSerializer

@api_view(['POST'])
def send_quote_email(request, quote_id):
    """Send quote document to customer"""
    try:
        quote = get_object_or_404(Quote, id=quote_id)
        
        # Get uploaded file if any
        uploaded_file = request.FILES.get('document')
        
        success, message = send_quote_document(quote, uploaded_file)
        
        if success:
            return Response({
                'success': True,
                'message': message
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'success': False,
                'message': message
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    except Exception as e:
        return Response({
            'success': False,
            'message': f'Error sending quote email: {str(e)}'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def send_customer_message_email(request, quote_id):
    """Send message to customer"""
    try:
        quote = get_object_or_404(Quote, id=quote_id)
        message = request.data.get('message', '')
        
        if not message:
            return Response({
                'success': False,
                'message': 'Message is required'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        success, result_message = send_customer_message(quote, message)
        
        if success:
            return Response({
                'success': True,
                'message': result_message
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'success': False,
                'message': result_message
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    except Exception as e:
        return Response({
            'success': False,
            'message': f'Error sending message: {str(e)}'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
