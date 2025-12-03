# Centralized Management Portal

A white-labeled management portal that integrates ClickUp for task management and Quartzy for inventory/order management, along with a reception/visitor management system.

## Features

### Step 1 — UI Shell ✅
- Simple dashboard with login authentication
- Embeddable ClickUp views for task management
- Basic Quartzy wrapper API integration

### Step 2 — Integration Hub ✅
- Inventory management with Quartzy integration
- Orders management system
- Redis-based caching layer (with in-memory fallback)
- Comprehensive audit logging

### Step 3 — Reception App ✅
- Visitor check-in/check-out system
- Visitor badge management
- Host notification system
- Visit history tracking

### Step 4 — Search + Notifications ✅
- Global search across inventory, orders, tasks, and visitors
- Real-time notification system
- Notification management (read/unread/delete)

### Step 5 — Reporting ✅
- Inventory reports (summary, low stock)
- Order reports (history, pending orders)
- Visitor reports (daily logs, visitor history)
- Export options (PDF, CSV)

## Project Structure

```
├── frontend/                 # React TypeScript frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── context/         # React context providers
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service modules
│   │   ├── types/           # TypeScript type definitions
│   │   └── hooks/           # Custom React hooks
│   └── package.json
│
├── backend/                  # Node.js Express backend
│   ├── src/
│   │   ├── routes/          # API route handlers
│   │   ├── services/        # Business logic services
│   │   ├── middleware/      # Express middleware
│   │   ├── models/          # Data models
│   │   └── utils/           # Utility functions
│   └── package.json
│
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Redis (optional, for caching)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/eguillot1/Centralized-Management-Tools.git
cd Centralized-Management-Tools
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install backend dependencies:
```bash
cd ../backend
npm install
```

### Development

1. Start the backend server:
```bash
cd backend
npm run dev
```
The API server will start at http://localhost:4000

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```
The frontend will start at http://localhost:3000

### Demo Credentials
- Email: `admin@example.com`
- Password: `password`

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user
- `POST /api/auth/refresh` - Refresh token

### Inventory (Quartzy)
- `GET /api/quartzy/inventory` - List inventory items
- `GET /api/quartzy/inventory/:id` - Get inventory item
- `POST /api/quartzy/inventory` - Create inventory item
- `PUT /api/quartzy/inventory/:id` - Update inventory item

### Orders
- `GET /api/quartzy/orders` - List orders
- `GET /api/quartzy/orders/:id` - Get order
- `POST /api/quartzy/orders` - Create order
- `PATCH /api/quartzy/orders/:id/status` - Update order status

### Search
- `GET /api/search?q=query` - Global search

### Notifications
- `GET /api/notifications` - List notifications
- `PATCH /api/notifications/:id/read` - Mark as read
- `PATCH /api/notifications/read-all` - Mark all as read
- `DELETE /api/notifications/:id` - Delete notification

### Audit Logs
- `GET /api/audit` - List audit logs (admin only)

## Environment Variables

### Backend
```
PORT=4000
JWT_SECRET=your-secret-key
REDIS_URL=redis://localhost:6379
QUARTZY_API_KEY=your-quartzy-api-key (for production)
```

### Frontend
```
VITE_API_URL=/api
```

## Tech Stack

### Frontend
- React 18 with TypeScript
- React Router v6 for navigation
- Axios for HTTP requests
- Vite for build tooling

### Backend
- Node.js with Express
- TypeScript
- JWT for authentication
- Redis for caching (optional)
- bcryptjs for password hashing

## License

MIT
