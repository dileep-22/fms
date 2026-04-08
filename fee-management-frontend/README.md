# Fee Management System - Frontend

A modern, responsive Fee Management System web application built with React, Tailwind CSS, and Recharts.

## ✨ Features

### Core Features
- **Login Page** - Secure authentication with email/password
- **Dashboard** - Overview with statistics, charts, and recent transactions
- **Student Management** - Add, edit, view, and delete student records
- **Payment Management** - Record and track fee payments with multiple methods
- **Reports** - Generate and download reports in PDF/Excel/CSV formats
- **Settings** - Manage profile, security, notifications, and appearance

### UI/UX Features
- 🎨 Modern, clean design inspired by Stripe dashboard
- 📱 Fully responsive (desktop, tablet, mobile)
- 🌓 Dark mode toggle
- 🔔 Toast notifications for user actions
- 📊 Interactive charts and data visualizations
- ⚡ Smooth animations and transitions
- 🔍 Search and filter functionality
- 📥 Export reports functionality

## 🛠️ Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Recharts** - Chart library for data visualization
- **Lucide React** - Beautiful icons
- **Date-fns** - Date manipulation

## 📁 Project Structure

```
fee-management-frontend/
├── src/
│   ├── components/
│   │   └── Layout.jsx          # Sidebar and Navbar components
│   ├── context/
│   │   ├── AuthContext.jsx     # Authentication state management
│   │   ├── ThemeContext.jsx    # Dark mode state management
│   │   └── ToastContext.jsx    # Toast notification system
│   ├── pages/
│   │   ├── LoginPage.jsx       # Login page
│   │   ├── Dashboard.jsx       # Main dashboard
│   │   ├── StudentsPage.jsx    # Student management
│   │   ├── PaymentsPage.jsx    # Payment management
│   │   ├── ReportsPage.jsx     # Reports and exports
│   │   └── SettingsPage.jsx    # Application settings
│   ├── App.jsx                 # Main app component with routing
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles and Tailwind directives
├── public/
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd fee-management-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Demo Credentials
```
Email: admin@feemanager.com
Password: admin123
```

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🎨 Color Palette

- **Primary**: Purple/Blue (#5b6cf9)
- **Success**: Green (#22c55e)
- **Warning**: Yellow (#eab308)
- **Danger**: Red (#ef4444)
- **Neutral**: Gray scale (#fafafa to #171717)

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔌 API Integration

The frontend is designed to work with a Spring Boot backend. Update the API base URL in your services to connect to your backend:

```javascript
// Example API configuration
const API_BASE_URL = 'http://localhost:8080/api';
```

Expected API endpoints:
- `/api/auth/login` - User authentication
- `/api/students` - Student CRUD operations
- `/api/payments` - Payment CRUD operations
- `/api/reports` - Report generation
- `/api/dashboard/stats` - Dashboard statistics

## 🎯 Key Components

### Authentication
- Protected routes using React Context
- Session persistence with localStorage
- Login form with validation

### Dashboard
- Summary cards with trend indicators
- Monthly collection bar chart
- Fee status pie chart
- Recent transactions table
- Quick action buttons

### Student Management
- Search by name/email
- Filter by class and status
- Modal forms for add/edit
- View student details
- Delete confirmation

### Payment Management
- Multiple payment methods (Cash, Card, UPI, etc.)
- Payment status tracking
- Transaction ID generation
- Payment method distribution chart

### Reports
- Date range filters
- Class-wise filtering
- Status-based filtering
- Export to PDF/Excel/CSV
- Recent reports list

## 🌟 Features Highlights

1. **Dark Mode** - Toggle between light and dark themes
2. **Toast Notifications** - Success, error, warning, and info messages
3. **Loading States** - Skeleton loaders for better UX
4. **Empty States** - Beautiful illustrations when no data
5. **Responsive Tables** - Scrollable on mobile devices
6. **Form Validation** - Client-side validation with error messages
7. **Modal Dialogs** - Clean popup forms for actions

## 📄 License

ISC

## 👨‍💻 Author

Fee Management System Team

---

**Note**: This is a frontend-only application. For full functionality, connect it to a Spring Boot backend with MySQL database.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
