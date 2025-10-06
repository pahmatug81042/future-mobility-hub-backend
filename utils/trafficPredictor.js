import Trip from '../models/Trip.js';

// Simple traffic prediction based on historical trips
export const predictTraffic = async (location) => {
    const now = new Date();
    const hour = now.getHours();

    const trips = await Trip.countDocuments({
        origin: location,
        scheduledTime: {
            $gte: new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour),
            $lt: new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour + 1)
        }
    });

    if (trips < 5) return 'low';
    if (trips < 15) return 'medium';
    return 'high';
};