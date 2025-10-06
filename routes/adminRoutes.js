import express from 'express';
import {
    getDashboardStats,
    getVehicleStatusCounts,
    getTripModeCounts,
    getPeakHours,
    getWeeklyTripTrends,
    getMonthlyTripTrends,
    getVehicleUsageHeatmap
} from '../controllers/adminController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/dashboard', authMiddleware, getDashboardStats);
router.get('/vehicles/status', authMiddleware, getVehicleStatusCounts);
router.get('/trips/modes', authMiddleware, getTripModeCounts);
router.get('/trips/peak-hours', authMiddleware, getPeakHours);

// Extended analytics
router.get('/analytics/weekly-trends', authMiddleware, getWeeklyTripTrends);
router.get('/analytics/monthly-trends', authMiddleware, getMonthlyTripTrends);
router.get('/analytics/vehicle-heatmap', authMiddleware, getVehicleUsageHeatmap);

export default router;