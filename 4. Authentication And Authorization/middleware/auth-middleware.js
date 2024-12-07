import jwt from 'jsonwebtoken';

export const authMiddleware = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;

        const token = authorization && authorization.split(" ")[1];

        if (!token) return res.status(403).json({
            success: false,
            message: "Access denied, Invalid token provided",
        });

        // verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.userInfo = decoded;

        next();

    } catch (error) {
        next(error);
    }
}