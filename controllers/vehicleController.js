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