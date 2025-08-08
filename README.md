# Hallihughes - Geological & Water Solutions

A comprehensive web application for Hallihughes, a professional geological and water management company. This project includes a modern frontend built with Next.js and a robust backend API built with Django.

## 🏗️ Project Structure

```
Hallihughes/
├── frontend/          # Next.js frontend application
├── backend/           # Django backend API
├── .gitignore         # Git ignore rules
└── README.md          # This file
```

## 🚀 Features

### Frontend (Next.js)
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI**: Built with shadcn/ui components
- **Quote Management**: Customer quote request system
- **Admin Dashboard**: Secure admin panel for managing quotes and projects
- **Real-time Updates**: Live backend status monitoring

### Backend (Django)
- **RESTful API**: Django REST Framework
- **Quote Management**: Complete CRUD operations for quotes
- **Email Integration**: Automated email sending for quotes and messages
- **File Upload**: Document attachment support
- **CORS Support**: Cross-origin resource sharing enabled

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 14
- **Language**: JavaScript/JSX
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Package Manager**: pnpm

### Backend
- **Framework**: Django 5.2.4
- **API**: Django REST Framework 3.16.0
- **Database**: SQLite (development)
- **CORS**: django-cors-headers 4.7.0
- **Email**: SMTP (Gmail)

## 📋 Prerequisites

- Node.js 18+ 
- Python 3.8+
- pnpm (for frontend)
- Git

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd Hallihughes
```

### 2. Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Start Django server
python manage.py runserver
```

The backend will be available at `http://localhost:8000`

### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The frontend will be available at `http://localhost:3000`

## 🔧 Configuration

### Backend Configuration
1. Navigate to `backend/hallihughes_backend/settings.py`
2. Update email settings for production:
   ```python
   EMAIL_HOST_USER = 'your-email@gmail.com'
   EMAIL_HOST_PASSWORD = 'your-app-password'
   ```

### Frontend Configuration
1. Update API base URL in `frontend/lib/api.ts` if needed
2. Configure environment variables in `.env.local` if required

## 📱 Usage

### Public Website
- Visit `http://localhost:3000` for the main website
- Submit quote requests through the contact form
- View services and company information

### Admin Panel
- Access admin panel at `http://localhost:3000/abmin`
- Manage quote requests and responses
- Send emails and documents to customers
- Monitor system status

## 🔐 Security Features

- **Admin Authentication**: Simple session-based authentication
- **Secure Routes**: Admin panel at non-standard URL (`/abmin`)
- **CORS Protection**: Configured for development and production
- **Input Validation**: Both frontend and backend validation

## 📧 Email Features

- **Quote Documents**: Send PDF/DOC attachments to customers
- **Customer Messages**: Personalized communication
- **Automated Workflows**: Status updates trigger email notifications

## 🎨 UI/UX Features

- **Responsive Design**: Works on all device sizes
- **Mobile Navigation**: Hamburger menu for mobile devices
- **Loading States**: Smooth loading indicators
- **Error Handling**: User-friendly error messages
- **Accessibility**: ARIA labels and keyboard navigation

## 🚀 Deployment

### Backend Deployment
1. Set `DEBUG = False` in settings
2. Configure production database (PostgreSQL recommended)
3. Set up static file serving
4. Configure production email settings

### Frontend Deployment
1. Build the application: `pnpm build`
2. Deploy to Vercel, Netlify, or your preferred platform
3. Configure environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary to Hallihughes.

## 📞 Support

For support, contact:
- **Location**: Plot 210, Flat 3, Lagos Road, Ikorodu, Lagos
- **Phone**: +234 802 606 9958, +234 813 653 2337
- **Email**: aknureni1968@gmail.com

---

**Built with ❤️ for Hallihughes** 