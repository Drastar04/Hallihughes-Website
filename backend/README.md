# Hallihughes Backend

Django REST API backend for the Hallihughes project.

## Setup

1. **Activate virtual environment:**
   ```bash
   .\venv\Scripts\Activate.ps1  # Windows PowerShell
   # or
   source venv/bin/activate     # Linux/Mac
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run migrations:**
   ```bash
   python manage.py migrate
   ```

4. **Create superuser (optional):**
   ```bash
   python manage.py createsuperuser
   ```

5. **Run development server:**
   ```bash
   python manage.py runserver
   ```

## API Endpoints

- `GET /api/health/` - Health check endpoint
- `GET /api/info/` - API information
- `GET /admin/` - Django admin interface

## Development

The backend is configured to work with the Next.js frontend running on `http://localhost:3000`.

CORS is enabled for development to allow cross-origin requests from the frontend. 