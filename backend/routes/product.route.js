import express from 'express';
import Product from './models/product.model.js';
import mongoose from 'mongoose';

const router = express.Router();


//router
//endpoints
router.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ succes: true, data: products })
    } catch (error) {
        console.log("error in fetching products", error.message)
        res.status(520).json({ success: false, message: "Server Error" })
    }
});

// POST
router.put("/api/products", async (req, res) => {
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


//PATCH/PUT method
//PATCH edita un elemento en especifico y PUT edita todo el elemento
router.put("/api/products/:id", async (req, res) => {
    const { id } = req.params;

    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Product Id" });
    }

    try {
        const updateProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        res.status(200).json({ success: true, data: updateProduct });
    } catch (error) {
        console.log("error in updating product:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
})



//Delete method
router.delete("/api/products/:id", async (req, res) => {
    const { id } = req.params
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ succes: true, message: "product deleted correctly" })
    } catch (error) {
        console.log("Error in deleting product", error.message)
        res.status(404).json({ succes: false, message: "Product not found" })
    }
})


export default router;