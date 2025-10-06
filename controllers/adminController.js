import Trip from '../models/Trip.js';
import Vehicle from '../models/Vehicle.js';

// Get admin dashboard statistics
export const getDashboardStats = async (req, res, next) => {
    try {
        const totalTrips = await Trip.countDocuments();
        const activeVehicles = await Vehicle.countDocuments({ status: 'available' });
        res.json({ success: true, stats: { totalTrips, activeVehicles } });
    } catch (err) {
        next(err);
    }
};