import { connect } from 'mongoose';

export const mongoDbConnection = async () => {
    try {
        await connect(process.env.MONGOURI);
        console.log("MONGO DB connection established!");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}