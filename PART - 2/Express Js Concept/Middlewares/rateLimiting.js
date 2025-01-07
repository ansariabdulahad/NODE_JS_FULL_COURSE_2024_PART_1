import rateLimit from 'express-rate-limit';

export const createBasicRateLimiter = (maxRequest, time) => {
    return rateLimit({
        windowMs: time,
        max: maxRequest,
        message: 'Too many requests, please try again later',
        standardHeaders: true,
        legacyHeaders: true
    });
}