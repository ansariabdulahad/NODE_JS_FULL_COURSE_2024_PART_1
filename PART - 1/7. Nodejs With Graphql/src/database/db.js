import { connect } from "mongoose";
import { config } from "dotenv";

config();

export const connectToDB = async () => {
    try {
        await connect("mongodb+srv://ansariabdulahad3:ansariabdulahad3@cluster0.glqq7.mongodb.net/graphqlcrud");
        console.log("Connected to database");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}