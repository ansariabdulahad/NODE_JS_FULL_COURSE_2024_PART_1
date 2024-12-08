import { Router } from 'express';
import { deleteImage, getAllImages, uploadImage } from '../controller/image-controller.js';
import {authMiddleware} from '../middleware/auth-middleware.js';
import {checkIsAdmin} from '../middleware/admin-middleware.js';
import multerMiddleware from '../middleware/multer-middleware.js';
import { checkIsUser } from '../middleware/user-middleware.js';

const router = Router();

router.get('/all-images', authMiddleware, getAllImages);
router.post('/upload', authMiddleware, checkIsAdmin, multerMiddleware.single('image'), uploadImage);
router.delete('/delete-image/:id', authMiddleware, checkIsAdmin, deleteImage);

export default router;