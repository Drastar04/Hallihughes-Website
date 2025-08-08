# Hallihughes Frontend

Next.js frontend application for the Hallihughes project.

## Features

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **shadcn/ui** components for consistent UI
- **Radix UI** primitives for accessible components
- **React Hook Form** for form handling
- **Zod** for schema validation

## Getting Started

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Run the development server:**
   ```bash
   pnpm dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Project Structure

```
frontend/
├── app/              # Next.js app directory (pages and layouts)
├── components/       # Reusable UI components
│   └── ui/          # shadcn/ui components
├── hooks/           # Custom React hooks
├── lib/             # Utility functions and configurations
├── public/          # Static assets
└── styles/          # Global styles
```

## Backend Integration

The frontend is configured to communicate with the Django backend running on `http://localhost:8000`. CORS is enabled on the backend to allow cross-origin requests.

## UI Components

This project uses shadcn/ui components built on top of Radix UI primitives. All components are located in `components/ui/` and can be customized as needed.

## Styling

- **Tailwind CSS** for utility-first styling
- **CSS Variables** for theming (dark/light mode support)
- **Tailwind CSS Animate** for smooth animations 