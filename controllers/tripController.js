import Trip from '../models/Trip.js';
import mongoose from 'mongoose';
import { sanitizeInput } from '../utils/sanitize.js';
import { getRoute } from '../utils/maps.js';
import { predictTraffic } from '../utils/trafficPredictor.js';

// Create a new trip with optimized route suggestion
export const createTrip = async (req, res, next) => {
    try {
        const origin = sanitizeInput(req.body.origin);
        const destination = sanitizeInput(req.body.destination);
        const mode = sanitizeInput(req.body.mode);
        const scheduledTime = req.body.scheduledTime;
        const notes = sanitizeInput(req.body.notes);

        // Predict traffic at origin
        const trafficPrediction = await predictTraffic(origin);

        // Get Google Maps route
        const route = await getRoute(origin, destination);

        const trip = await Trip.create({
            userId: req.user.id,
            origin,
            destination,
            mode,
            scheduledTime,
            notes,
            route,
            predictedTraffic: trafficPrediction
        });

        res.status(201).json({ success: true, trip });
    } catch (err) {
        next(err);
    }
};

// Get all trips of logged-in user
export const getTrips = async (req, res, next) => {
    try {
        const trips = await Trip.find({ userId: req.user.id });
        res.json({ success: true, trips });
    } catch (err) {
        next(err);
    }
};

// Get single trip by ID with ObjectId validation
export const getTripById = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).json({ success: false, message: 'Invalid trip ID' });

        const trip = await Trip.findById(id);
        if (!trip)
            return res.status(404).json({ success: false, message: 'Trip not found' });

        res.json({ success: true, trip });
    } catch (err) {
        next(err);
    }
};