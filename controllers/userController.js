import User from '../models/User.js';
import { sanitizeInput } from '../utils/sanitize.js';

// Get logged-in user's profile
export const getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({ success: true, user });
    } catch (err) {
        next(err);
    }
};

// Update user preferences
export const updatePreferences = async (req, res, next) => {
    try {
        const updates = {};
        if (req.body.mobilityMode) updates.mobilityMode = sanitizeInput(req.body.mobilityMode);
        if (typeof req.body.notifications !== 'undefined') updates.notifications = req.body.notifications;

        const user = await User.findByIdAndUpdate(req.user.id, { preferences: updates }, { new: true, runValidators: true }).select('-password');
        res.json({ success: true, user });
    } catch (err) {
        next(err);
    }
};