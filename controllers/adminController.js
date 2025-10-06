import Trip from '../models/Trip.js';
import Vehicle from '../models/Vehicle.js';
import { predictTraffic } from '../utils/trafficPredictor.js';

// Dashboard stats
export const getDashboardStats = async (req, res, next) => {
    try {
        const totalTrips = await Trip.countDocuments();
        const activeVehicles = await Vehicle.countDocuments({ status: 'available' });

        // Average predicted traffic for today at all origins
        const origins = await Trip.distinct('origin');
        const trafficPredictions = await Promise.all(
            origins.map(origin => predictTraffic(origin))
        );

        res.json({
            success: true,
            stats: {
                totalTrips,
                activeVehicles,
                trafficPredictions
            }
        });
    } catch (err) {
        next(err);
    }
};

// Vehicle status counts
export const getVehicleStatusCounts = async (req, res, next) => {
    try {
        const statuses = await Vehicle.aggregate([
            { $group: { _id: '$status', count: { $sum: 1 } } }
        ]);
        res.json({ success: true, statuses });
    } catch (err) { next(err); }
};

// Trip mode counts
export const getTripModeCounts = async (req, res, next) => {
    try {
        const modes = await Trip.aggregate([
            { $group: { _id: '$mode', count: { $sum: 1 } } }
        ]);
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

// Trip trends over past 7 days
export const getTripTrends = async (req, res, next) => {
    try {
        const now = new Date();
        const past7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

        const trends = await Trip.aggregate([
            { $match: { scheduledTime: { $gte: past7Days } } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$scheduledTime" } },
                    trips: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        res.json({ success: true, trends });
    } catch (err) { next(err); }
};