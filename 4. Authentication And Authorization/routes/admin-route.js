import { Router } from 'express';
import { authMiddleware } from '../middleware/auth-middleware.js';
import { checkIsAdmin } from '../middleware/admin-middleware.js';

const router = Router();

router.get('/welcome',authMiddleware, checkIsAdmin, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to the admin panel",
        userInfo: req.userInfo
    });
})

export default router;