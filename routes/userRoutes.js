import express from 'express';
import { body } from 'express-validator';
import { getProfile, updatePreferences } from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { validateRequest } from '../middlewares/validateRequest.js';

const router = express.Router();

// Get user profile
router.get('/profile', authMiddleware, getProfile);

// Update preferences
router.put(
    '/preferences',
    authMiddleware,
    [
        body('mobilityMode').optional().isString().withMessage('mobilityMode must be a string'),
        body('notifications').optional().isBoolean().withMessage('notifications must be boolean'),
    ],
    validateRequest,
    updatePreferences
);

export default router;