import Vehicle from '../models/Vehicle.js';

// Get all vehicles
export const getVehicles = async (req, res, next) => {
    try {
        const vehicles = await Vehicle.find();
        res.json({ success: true, vehicles });
    } catch (err) {
        next(err);
    }
};

import { sanitizeInput } from '../utils/sanitize.js';
import mongoose from 'mongoose';

// Update vehicle status
export const updateVehicleStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ success: false, message: 'Invalid vehicle ID' });

        const status = sanitizeInput(req.body.status);
        const vehicle = await Vehicle.findByIdAndUpdate(id, { status }, { new: true });
        if (!vehicle) return res.status(404).json({ success: false, message: 'Vehicle not found' });

        res.json({ success: true, vehicle });
    } catch (err) {
        next(err);
    }
};