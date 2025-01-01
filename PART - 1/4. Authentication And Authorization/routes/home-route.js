import { Router } from 'express';
import { authMiddleware } from '../middleware/auth-middleware.js';
import { checkIsUser } from '../middleware/user-middleware.js';

const router = Router();

router.get('/welcome', authMiddleware, checkIsUser, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to user homepage",
        userInfo: req.userInfo
    });
})

export default router;