import Trip from '../models/Trip.js';
import Vehicle from '../models/Vehicle.js';

// Dashboard stats
export const getDashboardStats = async (req, res, next) => {
    try {
        const totalTrips = await Trip.countDocuments();
        const activeVehicles = await Vehicle.countDocuments({ status: 'available' });
        res.json({ success: true, stats: { totalTrips, activeVehicles } });
    } catch (err) { next(err); }
};

// Vehicle status counts
export const getVehicleStatusCounts = async (req, res, next) => {
    try {
        const statuses = await Vehicle.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]);
        res.json({ success: true, statuses });
    } catch (err) { next(err); }
};

// Trip mode counts
export const getTripModeCounts = async (req, res, next) => {
    try {
        const modes = await Trip.aggregate([{ $group: { _id: '$mode', count: { $sum: 1 } } }]);
        res.json({ success: true, modes });
    } catch (err) { next(err); }
};

// Peak hours
export const getPeakHours = async (req, res, next) => {
    try {
        const pipeline = [
            { $group: { _id: { $hour: '$scheduledTime' }, trips: { $sum: 1 } } },
            { $sort: { trips: -1 } },
            { $limit: 5 }
        ];
        const peakHours = await Trip.aggregate(pipeline);
        res.json({ success: true, peakHours });
    } catch (err) { next(err); }
};