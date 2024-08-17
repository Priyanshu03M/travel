import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.mongo_url!)
        const connection = mongoose.connection;
        connection.on('connected', ()=>{
            console.log("MongoDB connected successfully");
        })
        connection.on('error', (err)=>{
            console.log("MongoDB connection error");
            process.exit();
        })
    }
    catch (error)
    {
        console.log("Someting went wrong");
        console.log(error);
    }
    
}