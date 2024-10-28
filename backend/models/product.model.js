import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        avaliable: {
            type: Boolean,
            required: true
        }
    }, {
        timestamps: true // createedit

}
)

const Product = mongoose.model('Product', productSchema);

export default Product;
