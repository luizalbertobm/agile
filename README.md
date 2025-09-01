# 🐝 Bee Agile

[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.2-646CFF.svg)](https://vitejs.dev/)
[![Flowbite React](https://img.shields.io/badge/Flowbite%20React-0.12.7-06B6D4.svg)](https://flowbite-react.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.12-38B2AC.svg)](https://tailwindcss.com/)

A modern, professional React application for creating, validating, and managing User Stories with an intuitive interface built using React, Tailwind CSS, and Flowbite components.

## ✨ Features

- **🎨 Modern UI/UX**: Clean, responsive design with Flowbite React components
- **🌓 Dark/Light Mode**: Seamless theme switching with system preference detection
- **🌍 Internationalization**: Multi-language support (Portuguese/English) with react-i18next
- **📱 Responsive Design**: Mobile-first approach with Tailwind CSS
- **📋 User Story Management**: Create, organize, and track user stories efficiently
- **⚡ Performance Optimized**: React 19 with modern hooks and best practices
- **🔧 Professional Architecture**: Modular component structure with custom hooks
- **♿ Accessibility**: ARIA compliant with proper semantic HTML
- **💾 Local Storage**: Persistent user preferences and data

## 🚀 Quick Start

### Prerequisites

- Node.js 20.19+ or 22.12+ (recommended)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/luizalbertobm/agile.git
   cd agile
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build production-ready application |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality checks |

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── common/          # Shared components
│   │   ├── Navbar/      # Navigation component
│   │   └── Sidebar/     # Sidebar component
│   └── UserStory/       # User story related components
├── contexts/            # React Context providers
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
├── constants/           # Application constants
├── assets/             # Static assets
├── App.jsx             # Main application component
└── main.jsx            # Application entry point
```

## 🛠️ Tech Stack

### Core Technologies
- **React 19.1.1** - Modern React with latest features
- **Vite 7.1.2** - Fast build tool and development server
- **JavaScript (ES6+)** - Modern JavaScript features

### UI & Styling
- **Flowbite React 0.12.7** - Professional component library
- **Tailwind CSS 4.1.12** - Utility-first CSS framework
- **React Icons 5.5.0** - Comprehensive icon library
- **React Country Flag** - High-quality SVG flag icons for internationalization

### Internationalization
- **React i18next 15.7.3** - Internationalization framework
- **i18next 25.4.2** - Core internationalization library
- **i18next Browser Language Detector 8.2.0** - Automatic language detection

### Development Tools
- **ESLint 9.33.0** - Code linting and quality
- **Autoprefixer** - CSS vendor prefixing
- **React Refresh** - Fast refresh for development

## 🎯 Key Features Implementation

### Theme Management
- Custom `useTheme` hook for theme state management
- Local storage persistence for user preferences
- System preference detection on first visit
- Smooth transitions between light and dark modes

### Component Architecture
- **Modular Design**: Each component has single responsibility
- **Custom Hooks**: Reusable logic extracted into hooks
- **Context API**: Global state management for user stories
- **Performance**: React.memo for optimized re-renders

### Internationalization System
- **Language Detection**: Automatic browser language detection with localStorage fallback
- **Professional Flags**: High-quality SVG flags using react-country-flag
- **Elegant UI**: Dropdown selector with gradients, animations, and visual indicators
- **Comprehensive Coverage**: Full interface translation (navbar, sidebar, forms, messages)
- **Persistence**: User language preference saved locally
- **Supported Languages**: Portuguese (Brazil) and English (United States)

### Professional Practices
- **Accessibility**: ARIA labels and semantic HTML
- **Error Handling**: Graceful error boundaries
- **Code Quality**: ESLint with React-specific rules
- **Type Safety**: PropTypes for component validation

## 🔧 Configuration

### Environment Setup
The application uses Vite's built-in environment variable handling. Create a `.env.local` file for local development:

```env
# Development settings
VITE_APP_TITLE=Bee Agile
VITE_APP_VERSION=1.0.0
```

### Flowbite Configuration
The Flowbite React plugin is configured in `.flowbite-react/config.json`:

```json
{
  "dark": true,
  "path": "src/components",
  "version": 4
}
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)  
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style and conventions
- Add proper documentation for new features
- Ensure all ESLint rules pass
- Test your changes across different screen sizes
- Maintain accessibility standards

## 📝 License

This project is private and not available for public use.

## 👤 Author

**Luiz Alberto**
- GitHub: [@luizalbertobm](https://github.com/luizalbertobm)

## 🙏 Acknowledgments

- [React Team](https://reactjs.org/) for the amazing framework
- [Flowbite](https://flowbite.com/) for the beautiful component library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Vite](https://vitejs.dev/) for the lightning-fast build tool

---

Built with ❤️ using modern web technologies
