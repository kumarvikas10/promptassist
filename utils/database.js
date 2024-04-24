import mongoose from "mongoose";
import 'aws4'; 

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log("Database is connected Already");
        return mongoose.connection;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompt",
            bufferCommands: false, // Disable buffering
            serverSelectionTimeoutMS: 5000, // Timeout in milliseconds
            socketTimeoutMS: 45000, // Timeout in milliseconds
        });

        isConnected = true;
        console.log("MongoDB Connected");
        return mongoose.connection;
    } catch (error) {
        console.log(error);
        throw error; // Rethrow the error to handle it in the calling code
    }
};