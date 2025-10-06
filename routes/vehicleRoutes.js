import express from 'express';
import { body, param } from 'express-validator';
import { getVehicles, updateVehicleStatus } from '../controllers/vehicleController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { validateRequest } from '../middlewares/validateRequest.js';

const router = express.Router();

// Get all vehicles
router.get('/', authMiddleware, getVehicles);

// Update vehicle status
router.put(
    '/:id/status',
    authMiddleware,
    [
        param('id').isMongoId().withMessage('Invalid vehicle ID'),
        body('status').notEmpty().withMessage('Status is required').isIn(['available', 'busy', 'offline']).withMessage('Invalid status'),
    ],
    validateRequest,
    updateVehicleStatus
);

export default router;