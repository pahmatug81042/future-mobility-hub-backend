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

// Get vehicle status counts
export const getVehicleStatusCounts = async (req, res, next) => {
    try {
        const statuses = await Vehicle.aggregate([
            { $group: { _id: '$status', count: { $sum: 1 } } }
        ]);
        res.json({ success: true, statuses });
    } catch (err) {
        next(err);
    }
};