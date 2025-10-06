# Future Mobility Hub - Backend

**Future Mobility Hub** is a secure, modular, and scalable backend API built with **Node.js**, **Express**, and **MongoDB** (MERN stack). It serves as the backbone for a modern transportation and mobility platform that connects users, trips, and vehicles while ensuring security, performance, and maintainability.

---

## Features

- **User Management**
  - Register, login, logout
  - User profile retrieval
  - Update user preferences

- **Trip Management**
  - Create and manage trips
  - Retrieve trips by user
  - Secure trip ID validation

- **Vehicle Management**
  - View all vehicles
  - Update vehicle status for fleet management

- **Admin Dashboard**
  - Analytics for total trips and active vehicles
  - Aggregated statistics for trips and vehicles

- **Security**
  - Input sanitization using **DOMPurify**
  - HTTP headers protection via **Helmet**
  - MongoDB query sanitization with **express-mongo-sanitize**
  - Rate limiting on authentication endpoints
  - JWT-based authentication with **httpOnly cookies**
  - Centralized error handling
  - Validation with **express-validator**

- **Scalable Architecture**
  - Modular controllers, routes, and middlewares
  - Utility functions for reusable logic
  - Ready for real-time features like **Socket.io** and traffic analytics

- **Environment Variables**
  - Configurable database connection, JWT secrets, and frontend URL
  - Supports development and production environments

---

## Tech Stack

- **Node.js** & **Express.js**
- **MongoDB** with **Mongoose**
- **JWT Authentication**
- **Security Packages**: Helmet, express-mongo-sanitize, cookie-parser
- **Validation & Sanitization**: express-validator, DOMPurify
- **CORS Enabled** for frontend integration

---

## Getting Started

1. Clone the repository.
2. Install dependencies:

```bash
npm install
```
3. Set up your .env file with:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=15m
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```
4. Start the server:
```bash
npm run server
```
The server will run on http://localhost:5000 by default.

## Security & Best Practices
* All inputs are validated and sanitized.
* JWT tokens are stored securely in httpOnly cookies.
* Error messages do not leak sensitive information in production.
* Rate limiting protects authentication endpoints from brute-force attacks.

## Future Enhancements
* Real-time updates via Socket.io (e.g., traffic, ride status)
* Integration with Google Maps API or OpenStreetMap
* AI/ML module for traffic prediction and route optimization
* Extended analytics and admin features