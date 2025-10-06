import Trip from '../models/Trip.js';

/**
 * Predict traffic congestion for a location
 * Returns a score and classification: 'low', 'medium', 'high'
 * Optionally uses a lookback period from .env
 */
export const predictTraffic = async (location) => {
    const now = new Date();
    const currentHour = now.getHours();

    // Lookback hours (default 24)
    const lookbackHours = parseInt(process.env.TRAFFIC_PREDICTION_LOOKBACK_HOURS || '24');

    const startTime = new Date(now.getTime() - lookbackHours * 60 * 60 * 1000);

    // Count trips per hour for location
    const trips = await Trip.find({
        origin: location,
        scheduledTime: { $gte: startTime, $lte: now }
    });

    // Compute weighted traffic: more recent trips have higher weight
    let weightedCount = 0;
    trips.forEach(trip => {
        const hoursAgo = (now - new Date(trip.scheduledTime)) / (1000 * 60 * 60);
        const weight = 1 - hoursAgo / lookbackHours; // Linear decay
        weightedCount += weight;
    });

    // Determine traffic level
    if (weightedCount < 5) return { level: 'low', score: weightedCount.toFixed(2) };
    if (weightedCount < 15) return { level: 'medium', score: weightedCount.toFixed(2) };
    return { level: 'high', score: weightedCount.toFixed(2) };
};