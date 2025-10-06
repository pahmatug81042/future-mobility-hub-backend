import express from 'express';
import { getDashboardStats, getVehicleStatusCounts, getTripModeCounts } from '../controllers/adminController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Admin dashboard stats
router.get('/dashboard', authMiddleware, getDashboardStats);

// Vehicle status counts
router.get('/vehicles/status', authMiddleware, getVehicleStatusCounts);

// Trip mode counts
router.get('/trips/modes', authMiddleware, getTripModeCounts);

export default router;