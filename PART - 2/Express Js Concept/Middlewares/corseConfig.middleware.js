import cors from 'cors';

export const corsConfiguration = () => {
    return cors({
        origin: (origin, callback) => {
            const whitelist = [
                'http://localhost:5000',
                'https://customdomainproduction.com'
            ]

            if (!origin || !whitelist.indexOf(origin) !== -1) {
                callback(null, true)
            } else {
                callback(new Error(origin + ' Not allowed by CORS'))
            }
        },
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
        exposedHeaders: ['X-Total-Count', 'Content-Range'],
        credentials: true,
        preflightContinue: false,
        optionsSuccessStatus: 204,
        maxAge: 600 // 10 minutes -> 600 seconds
    })
}