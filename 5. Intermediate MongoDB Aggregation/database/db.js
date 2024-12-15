import { connect } from 'mongoose';

export const connectToDB = async () => {
    try {
        await connect(process.env.MONGO_URI);
        console.log('Connected to database');
    } catch (error) {
        throw new Error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
}