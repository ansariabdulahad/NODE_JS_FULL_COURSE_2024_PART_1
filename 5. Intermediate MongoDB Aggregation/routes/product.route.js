import { Router } from 'express';
import { getProductStat, insertSampleProducts } from '../controllers/product.controller.js';

const router = Router();

router.post('/insert', insertSampleProducts);
router.get('/stat', getProductStat);

export default router;