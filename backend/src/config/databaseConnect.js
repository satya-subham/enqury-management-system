import mongoose from "mongoose";
async function databaseConnection(url){
    try {
        await mongoose.connect(url);
        console.log("Database connected successfully");
    } catch (error) {
        console.log(error.message)
    }
}

export default databaseConnection;