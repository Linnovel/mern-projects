import express from 'express';
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';

dotenv.config();


//servidor
const app = express()


//router
app.get("/products", (req, res) => {
    // res.send("Server is ready")
})

// console.log(process.env.MONGO_URL)

app.listen(5000, (() => {
    connectDB();
    console.log('server started at http://localhost:5000')
}))

