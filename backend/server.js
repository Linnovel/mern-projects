import express from 'express';
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';
import Product from './models/product.model.js';

dotenv.config();


//servidor
const app = express()

app.use(express.json()); //allow us to accept json data in the req.body


//router
//endpoints
app.get("/api", (req, res) => {
    res.send("Server is ready")
    console.log(`Server is ready ${res}`)
});

// POST
app.post("/api/products", async (req, res) => {
    const product = req.body; //user body to create product

    if (!product.name || !product.price || !product.image || !product.avaliable) {
        return res.status(400).json({ success: false, message: 'Please provide all fields' })
    }

    const newProduct = new Product(product)

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct })
    } catch (error) {
        console.log("Error in creating product", error.message)
        res.status(500).json({ success: false, message: "Server Error" })
    }
})

//Delete method
app.delete("/api/products/:id", async (req, res) => {
    const { id } = req.params
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ succes: true, message: "product deleted correctly" })
    } catch (error) {

    }
})


// console.log(process.env.MONGO_URL)

app.listen(5000, (() => {
    connectDB();
    console.log('server started at http://localhost:5000')
}))

