import express from 'express';
import { getDashboardStats, getVehicleStatusCounts, getTripModeCounts, getPeakHours } from '../controllers/adminController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/dashboard', authMiddleware, getDashboardStats);
router.get('/vehicles/status', authMiddleware, getVehicleStatusCounts);
router.get('/trips/modes', authMiddleware, getTripModeCounts);
router.get('/trips/peak-hours', authMiddleware, getPeakHours);

export default router;