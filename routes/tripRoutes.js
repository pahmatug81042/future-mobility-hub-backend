import express from 'express';
import { body, param, query } from 'express-validator';
import { createTrip, getTrips, getTripById, suggestOptimalRoute } from '../controllers/tripController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { validateRequest } from '../middlewares/validateRequest.js';

const router = express.Router();

// Create a trip
router.post(
    '/',
    authMiddleware,
    [
        body('origin').notEmpty().withMessage('Origin is required'),
        body('destination').notEmpty().withMessage('Destination is required'),
        body('scheduledTime').notEmpty().withMessage('Scheduled time is required').isISO8601().toDate(),
        body('mode').optional().isString(),
        body('notes').optional().isString()
    ],
    validateRequest,
    createTrip
);

// Get all trips
router.get('/', authMiddleware, getTrips);

// Get trip by ID
router.get(
    '/:id',
    authMiddleware,
    param('id').isMongoId().withMessage('Invalid trip ID'),
    validateRequest,
    getTripById
);

// Predictive optimal route
router.get(
    '/optimal-route',
    authMiddleware,
    [
        query('origin').notEmpty().withMessage('Origin is required'),
        query('destination').notEmpty().withMessage('Destination is required')
    ],
    validateRequest,
    suggestOptimalRoute
);

export default router;