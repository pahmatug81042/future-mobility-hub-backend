import rateLimit from 'express-rate-limit';

export const createRateLimiter = ({ windowMs = 15 * 60 * 1000, max = 10, message } = {}) => {
    return rateLimit({
        windowMs,
        max,
        message: message || 'Too many requests, please try again later',
    });
};