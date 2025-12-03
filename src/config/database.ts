import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try{
    await mongoose.connect(process.env.MONGODB_URI || "");
    console.log("MongoDB connected successfully"); 
  }catch(error){
    throw new Error(` Failed to connect to MongoDB: ${error}`);
  }
}

const disconnectDB = async (): Promise<void> => {
  try{
    await mongoose.disconnect();
    console.log("MongoDB disconnected successfully");
  }catch(error){
    throw new Error(` Failed to disconnect from MongoDB: ${error}`);
  }
}

export { connectDB, disconnectDB };
