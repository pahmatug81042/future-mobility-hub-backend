import User from '../models/User.js';
import { generateToken } from '../utils/tokenUtils.js';
import { sanitizeInput } from '../utils/sanitize.js';
import bcrypt from 'bcryptjs';

// Register a new user
export const register = async (req, res, next) => {
    try {
        const name = sanitizeInput(req.body.name);
        const email = sanitizeInput(req.body.email);
        const password = sanitizeInput(req.body.password);

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ success: false, message: 'Email already exists' });

        const user = await User.create({ name, email, password });
        res.status(201).json({ success: true, message: 'User registered successfully', userId: user._id });
    } catch (err) {
        next(err);
    }
};