import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { createServer } from 'http';
import { Server as SocketServer } from 'socket.io';

import { connectDB } from './config/db.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import tripRoutes from './routes/tripRoutes.js';
import vehicleRoutes from './routes/vehicleRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import trafficRoutes from './routes/trafficRoutes.js';
import { createRateLimiter } from './middlewares/rateLimiter.js';
import { predictTrafficAdvanced } from './utils/trafficPredictorAdvanced.js';

dotenv.config();

const app = express();
connectDB();

// Security Middlewares
app.use(helmet());
app.use(mongoSanitize());
app.use(cookieParser());
app.use(express.json());

// CORS
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

// Rate limiter for auth endpoints
app.use('/api/auth', createRateLimiter({ windowMs: 15 * 60 * 1000, max: 10 }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/traffic', trafficRoutes);

// Error middleware
app.use(errorMiddleware);

// HTTP + Socket.io server
const httpServer = createServer(app);
const io = new SocketServer(httpServer, {
    cors: { origin: process.env.FRONTEND_URL, methods: ['GET', 'POST'] }
});

// Socket.io real-time events
io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    // Ride status updates
    socket.on('updateRideStatus', (data) => io.emit('rideStatusUpdated', data));

    // Traffic updates with advanced prediction
    socket.on('updateTraffic', async (data) => {
        try {
            const prediction = await predictTrafficAdvanced(data.location);
            io.emit('trafficUpdated', { location: data.location, prediction });
        } catch (err) {
            console.error('Traffic prediction error:', err.message);
        }
    });

    socket.on('disconnect', () => console.log('Client disconnected:', socket.id));
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));