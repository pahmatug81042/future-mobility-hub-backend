import * as tf from '@tensorflow/tfjs'; // CPU-friendly
import Trip from '../models/Trip.js';

/**
 * Advanced traffic prediction using a simple feed-forward neural network
 * Aggregates past 7 days of hourly trip counts for a location
 * Returns traffic level: low / medium / high
 */
export const predictTrafficAdvanced = async (location, lookbackHours = 168) => {
    const now = new Date();
    const startTime = new Date(now.getTime() - lookbackHours * 60 * 60 * 1000);

    // Aggregate trips per hour
    const trips = await Trip.aggregate([
        { $match: { origin: location, scheduledTime: { $gte: startTime, $lte: now } } },
        { $group: { _id: { $hour: '$scheduledTime' }, count: { $sum: 1 } } },
        { $sort: { _id: 1 } }
    ]);

    // Prepare input tensor
    const counts = Array(lookbackHours).fill(0);
    trips.forEach(t => { counts[t._id] = t.count; });
    const inputTensor = tf.tensor2d([counts], [1, lookbackHours]);

    // Simple neural network model
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 16, activation: 'relu', inputShape: [lookbackHours] }));
    model.add(tf.layers.dense({ units: 3, activation: 'softmax' }));

    // Fake predict for demo; in production, train model or load saved weights
    const prediction = model.predict(inputTensor);
    const predArray = await prediction.array();
    const maxIndex = predArray[0].indexOf(Math.max(...predArray[0]));

    const levels = ['low', 'medium', 'high'];
    return { level: levels[maxIndex], score: predArray[0][maxIndex].toFixed(2) };
};