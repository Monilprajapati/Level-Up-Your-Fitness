import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const connnectionOfDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}`)
    console.log("Successfully Connected!!");
  }
  catch (error) {
    console.log("Mongodb connection error... ", error);
    process.exit(1)
  }
}

export default connnectionOfDB;



