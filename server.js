// ...existing imports and setup
import { predictTraffic } from './utils/trafficPredictor.js';

// HTTP + Socket.io server
const httpServer = createServer(app);
const io = new SocketServer(httpServer, {
    cors: { origin: process.env.FRONTEND_URL, methods: ['GET', 'POST'] }
});

// Socket.io real-time events
io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    // Ride status updates
    socket.on('updateRideStatus', (data) => {
        io.emit('rideStatusUpdated', data);
    });

    // Traffic updates
    socket.on('updateTraffic', async (data) => {
        // Predict new traffic level for the location
        const prediction = await predictTraffic(data.location);
        io.emit('trafficUpdated', { location: data.location, prediction });
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));