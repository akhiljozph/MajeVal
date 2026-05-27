import { rateLimit } from 'express-rate-limit';

export const apiGeneralLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: {
        status: 429,
        message: 'Too many requests from this IP. Please try again in 15 minutes.'
    }
});

export const authLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 5,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: {
        status: 429,
        message: 'Too many login or registration attempts. Please try again in a minute.'
    }
});