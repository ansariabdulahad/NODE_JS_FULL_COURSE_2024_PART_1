import { connect } from "mongoose";

export const connectToDb = async () => {
    try {
        await connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}