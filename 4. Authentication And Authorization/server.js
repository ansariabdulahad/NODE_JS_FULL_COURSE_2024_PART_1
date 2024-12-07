import { config } from "dotenv";
import express from 'express';
import { connectToDb } from "./database/db.js";

import authRoutes from './routes/auth-route.js';
import userRoutes from './routes/home-route.js';
import adminRoutes from './routes/admin-route.js';

config();
connectToDb();

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);

app.listen(process.env.PORT || 5000, (err) => {
    if (err) throw err;
    console.log(`listening on ${process.env.PORT}`);
});