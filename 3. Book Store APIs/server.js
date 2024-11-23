import {config} from 'dotenv';
import express from 'express';
import { mongoDbConnection } from './database/db.js';

config();

const app = express();

app.use(express.json());

await mongoDbConnection();

app.listen(process.env.PORT || 5000, (err) => {
    if (err) throw err;
    console.log(`Server listening on port ${process.env.PORT}`);
});