# Future Mobility Hub - Backend

**Future Mobility Hub** is a secure, modular, and scalable backend API built with **Node.js**, **Express**, and **MongoDB** (MERN stack). It powers a modern transportation platform that connects users, trips, and vehicles while providing **real-time updates**, **AI/ML-based predictive routing**, and **advanced analytics**.

---
## Link to Frontend GitHub Repository
https://github.com/pahmatug81042/future-mobility-hub-frontend
---

## Features

### 1. User Management
- Register, login, logout
- Retrieve and update user profile
- Manage user preferences

### 2. Trip Management
- Create, update, and manage trips
- Predictive route suggestions based on traffic forecasts
- Retrieve trips per user with secure trip ID validation
- Alternative routing for accessibility and low-traffic streets

### 3. Vehicle Management
- View fleet vehicles and their statuses
- Track vehicle availability and location
- Vehicle utilization analytics

### 4. Admin Dashboard & Analytics
- Total trips, active vehicles, and trip modes
- Peak hour analysis and heatmaps
- Weekly, monthly, and multi-month trip trends
- KPI metrics: on-time trips, average delays, peak efficiency
- Predictive insights using AI/ML traffic models
- CSV/JSON export for analytics

### 5. Security
- Input sanitization with **DOMPurify**
- HTTP headers protection with **Helmet**
- MongoDB query sanitization via **express-mongo-sanitize**
- Rate limiting for authentication endpoints
- JWT authentication with **httpOnly cookies**
- Centralized error handling
- Validation with **express-validator**

### 6. Real-time Features
- **Socket.io** for real-time ride status and traffic updates
- Broadcast predictive traffic levels per location
- Ready for vehicle telemetry and IoT integration

### 7. Scalable Architecture
- Modular **controllers**, **routes**, and **middlewares**
- Utility functions for reusable logic
- Easy integration with AI/ML modules and mapping APIs

---

## Tech Stack

- **Node.js** & **Express.js**
- **MongoDB** with **Mongoose**
- **JWT Authentication**
- **Security Packages**: Helmet, express-mongo-sanitize, cookie-parser
- **Validation & Sanitization**: express-validator, DOMPurify
- **CORS Enabled** for frontend integration
- **Socket.io** for real-time communication
- **Google Maps API / OpenStreetMap** for routing
- **AI/ML Models** for traffic prediction and route optimization

---

## Getting Started

1. Clone the repository:

```bash
git clone <repository_url>
cd future-mobility-hub-backend
```
2. Install dependencies:
```bash
npm install
```
3. Set up your .env file:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=15m
FRONTEND_URL=http://localhost:5173
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
NODE_ENV=development
```
4. Start the server:
```bash
npm run server
```
Server will run on http://localhost:5000 by default.

## API Endpoints
### Auth
* POST /api/auth/register – Register new users
* POST /api/auth/login – Login
* POST /api/auth/logout – Logout

### Users
* GET /api/users/me – Retrieve current user profile

### Trips
* POST /api/trips/ – Create a trip with predictive routing
* GET /api/trips/ – Get all trips for the logged-in user
* GET /api/trips/:id – Get a specific trip by ID
* GET /api/trips/optimal-route?origin=<>&destination=<> – Predictive optimal route

### Vehicles
* CRUD operations for vehicles and fleet management

### Admin
* GET /api/admin/dashboard – Stats including predictive traffic
* GET /api/admin/vehicles/status – Vehicle status counts
* GET /api/admin/trips/modes – Trip mode counts
* GET /api/admin/trips/peak-hours – Peak hour analysis
* GET /api/admin/analytics/weekly-trends
* GET /api/admin/analytics/monthly-trends
* GET /api/admin/analytics/vehicle-heatmap

### Traffic
* Real-time updates via Socket.io
* Predictive traffic per location

## Security & Best Practices
* All inputs are validated and sanitized
* JWT tokens stored in httpOnly cookies
* Error messages do not leak sensitive info in production
* Rate limiting prevents brute-force attacks
* Centralized error handling

## Future Enhancements
* Multi-modal route prediction with reinforcement learning
* Autonomous vehicle fleet integration
* Advanced traffic simulations for predictive analytics
* Blockchain-based ride verification for shared trips
* Accessibility-aware and eco-friendly routing