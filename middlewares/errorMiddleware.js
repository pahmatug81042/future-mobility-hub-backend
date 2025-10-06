export const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 500;
    const message = process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message;
    res.status(status).json({ success: false, message });
};