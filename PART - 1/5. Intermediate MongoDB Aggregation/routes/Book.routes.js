import { Router } from 'express';
import { createAuthor, createBook, getBookByAuthor } from '../controllers/Book.controller.js';

const router = Router();

router.post('/author-create', createAuthor);
router.post('/book-create', createBook);
router.get('/author/:id', getBookByAuthor);

export default router;