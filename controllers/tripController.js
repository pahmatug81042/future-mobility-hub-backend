import Trip from '../models/Trip.js';
import mongoose from 'mongoose';
import { sanitizeInput } from '../utils/sanitize.js';

// Create a new trip
export const createTrip = async (req, res, next) => {
    try {
        const origin = sanitizeInput(req.body.origin);
        const destination = sanitizeInput(req.body.destination);
        const mode = sanitizeInput(req.body.mode);
        const scheduledTime = req.body.scheduledTime;
        const notes = sanitizeInput(req.body.notes);

        const trip = await Trip.create({ userId: req.user.id, origin, destination, mode, scheduledTime, notes });
        res.status(201).json({ success: true, trip });
    } catch (err) {
        next(err);
    }
};