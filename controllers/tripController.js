import Trip from '../models/Trip.js';
import mongoose from 'mongoose';
import { sanitizeInput } from '../utils/sanitize.js';
import { getRoute } from '../utils/maps.js';
import { predictTrafficAdvanced } from '../utils/trafficPredictorAdvanced.js';
import Vehicle from '../models/Vehicle.js';

// Create trip with predictive route
export const createTrip = async (req, res, next) => {
    try {
        const origin = sanitizeInput(req.body.origin);
        const destination = sanitizeInput(req.body.destination);
        const mode = sanitizeInput(req.body.mode);
        const scheduledTime = req.body.scheduledTime;
        const notes = sanitizeInput(req.body.notes);

        const trafficPrediction = await predictTrafficAdvanced(origin);
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
    } catch (err) { next(err); }
};

// Get all trips of logged-in user
export const getTrips = async (req, res, next) => {
    try {
        const trips = await Trip.find({ userId: req.user.id });
        res.json({ success: true, trips });
    } catch (err) { next(err); }
};

// Get trip by ID
export const getTripById = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).json({ success: false, message: 'Invalid trip ID' });

        const trip = await Trip.findById(id);
        if (!trip)
            return res.status(404).json({ success: false, message: 'Trip not found' });

        res.json({ success: true, trip });
    } catch (err) { next(err); }
};

// Predictive optimal route suggestion
export const suggestOptimalRoute = async (req, res, next) => {
    try {
        const origin = sanitizeInput(req.query.origin);
        const destination = sanitizeInput(req.query.destination);

        const originTraffic = await predictTrafficAdvanced(origin);
        const destinationTraffic = await predictTrafficAdvanced(destination);

        const availableVehicles = await Vehicle.countDocuments({ status: 'available', location: origin });
        const route = await getRoute(origin, destination);

        res.json({
            success: true,
            route,
            predictedTraffic: { origin: originTraffic, destination: destinationTraffic },
            availableVehicles
        });
    } catch (err) { next(err); }
};