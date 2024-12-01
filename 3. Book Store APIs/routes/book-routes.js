import { Router } from 'express';
import { createBook, deleteBookById, getAllBooks, getBookById, updateBookById } from '../controllers/book-controller.js';

const router = Router();

router.get('/getAllBooks', getAllBooks);
router.get('/getBook/:id', getBookById);
router.post('/createBook', createBook);
router.put('/updateBook/:id', updateBookById);
router.delete('/deleteBook/:id', deleteBookById);

export default router;