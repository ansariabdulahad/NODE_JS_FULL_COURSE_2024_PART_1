export class APIError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'APIError';
    }
}

export const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
}

export const globalErrorHandler = (err, req, res, next) => {
    console.error(err.stack);
    if (err instanceof APIError) {
        res.status(err.statusCode).json({
            status: err.statusCode,
            message: err.message
        });
    }
    // handle mongoose validation errors
    else if (err.name === 'validationError') {
        res.status(400).json({
            status: 400,
            message: err.message
        });
    }
    else {
        res.status(500).json({
            status: 500,
            message: 'Internal Server Error'
        });
    }
}