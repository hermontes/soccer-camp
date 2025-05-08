# Soccer Camp Application

A modern web application for managing soccer camp registrations and activities, built with cutting-edge technologies and a focus on user experience.

## 🚀 Technologies

### Frontend
- **Next.js 15** - React framework for production-grade applications
- **React 19** - JavaScript library for building user interfaces
- **Tailwind CSS 4** - Utility-first CSS framework
- **Headless UI** - Unstyled, fully accessible UI components
- **Radix UI** - Low-level UI component library
- **FontAwesome** - Icon library and toolkit
- **Hero Icons** - Beautiful hand-crafted SVG icons
- **Lucide React** - Beautiful & consistent icon set

### Development Tools
- **TurboPack** - Incremental bundler and build system
- **ESLint** - Code linting and static analysis
- **PostCSS** - CSS transformation tool

### Authentication & Database
- **Better Auth** - Authentication system
- **PostgreSQL** - Robust relational database (via `pg` driver)

## 🛠️ Project Structure

```
soccer-camp/
├── src/
│   ├── app/         # App router components and pages
│   ├── components/  # Reusable UI components
│   ├── lib/         # Utility functions and shared logic
│   ├── pages/       # Pages directory
│   └── middleware.js # Next.js middleware
├── public/          # Static assets
└── ...config files
```

## 🚦 Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables:
   ```bash
   cp .env.example .env.local
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
   The application will be available at [http://localhost:3000](http://localhost:3000)

## 🔑 Features

- Modern, responsive design with Tailwind CSS
- Interactive navigation with mobile-friendly menu
- Smooth animations and transitions
- Component-based architecture
- Type-safe development environment
- Authentication and authorization
- Database integration

## 📝 Scripts

- `npm run dev` - Start development server with TurboPack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📄 License

This project is private and proprietary. All rights reserved.
