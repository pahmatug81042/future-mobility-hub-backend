import User from '../models/User.js';

// Get logged-in user's profile
export const getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({ success: true, user });
    } catch (err) {
        next(err);
    }
};