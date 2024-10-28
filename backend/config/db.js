import mongoose from "mongoose"
import dotenv from 'dotenv'

dotenv.config();


export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDB Connected : ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error : ${error.mesagge}`)
        process.exit(1); // process 1 code means exit with failurse, 0 means succedd
    }
}
