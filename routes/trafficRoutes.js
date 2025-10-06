import express from 'express';
import { predictTraffic } from '../utils/trafficPredictor.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { getRoute } from '../utils/maps.js';
import { sanitizeInput } from '../utils/sanitize.js';

const router = express.Router();

// Predict traffic for a location
router.get('/predict/:location', authMiddleware, async (req, res, next) => {
    try {
        const location = sanitizeInput(req.params.location);
        const trafficLevel = await predictTraffic(location);
        res.json({ success: true, location, trafficLevel });
    } catch (err) {
        next(err);
    }
});

// Get route between origin and destination
router.get('/route', authMiddleware, async (req, res, next) => {
    try {
        const origin = sanitizeInput(req.query.origin);
        const destination = sanitizeInput(req.query.destination);
        const route = await getRoute(origin, destination);
        res.json({ success: true, route });
    } catch (err) {
        next(err);
    }
});

export default router;