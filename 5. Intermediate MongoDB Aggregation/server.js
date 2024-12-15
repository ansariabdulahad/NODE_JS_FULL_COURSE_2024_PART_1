import { config } from 'dotenv';
import express from 'express';
import { connectToDB } from './database/db.js';
import productRoutes from './routes/product.route.js';
import bookRoutes from './routes/Book.routes.js';

config();
connectToDB();

const app = express();

app.use(express.json());

app.use('/api/product', productRoutes);
app.use('/api/book', bookRoutes);

app.listen(process.env.PORT, (err) => {
    if (err) throw err;
    console.log(`listening on ${process.env.PORT}`);
});