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

// Login a user
export const login = async (req, res, next) => {
    try {
        const email = sanitizeInput(req.body.email);
        const password = sanitizeInput(req.body.password);

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ success: false, message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ success: false, message: 'Invalid credentials' });

        const token = generateToken({ id: user._id, role: user.role });
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'Strict', maxAge: 15 * 60 * 1000 });
        res.json({ success: true, message: 'Login successful' });
    } catch (err) {
        next(err);
    }
};

// Logout user
export const logout = (req, res) => {
    res.clearCookie('token');
    res.json({ success: true, message: 'Logged out successfully' });
};