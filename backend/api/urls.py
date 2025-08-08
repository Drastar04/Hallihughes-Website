from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'projects', views.ProjectViewSet)
router.register(r'quotes', views.QuoteViewSet)

urlpatterns = [
    path('', views.root_view, name='root'),
    path('health/', views.health_check, name='health_check'),
    path('info/', views.api_info, name='api_info'),
    path('quotes/<int:quote_id>/send-quote/', views.send_quote_email, name='send_quote_email'),
    path('quotes/<int:quote_id>/send-message/', views.send_customer_message_email, name='send_customer_message_email'),
    path('', include(router.urls)),
] 