import {config} from 'dotenv';
import express from 'express';

import { mongoDbConnection } from './database/db.js';
import BookRoutes from './routes/book-routes.js';

config();

const app = express();

app.use(express.json());

app.use('/api/book', BookRoutes);

await mongoDbConnection();

app.listen(process.env.PORT || 5000, (err) => {
    if (err) throw err;
    console.log(`Server listening on port ${process.env.PORT}`);
});