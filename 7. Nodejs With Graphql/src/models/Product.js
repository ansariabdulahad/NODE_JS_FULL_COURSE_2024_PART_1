import { model, Schema } from "mongoose";

const ProductSchema = new Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    inStock: { type: Boolean, required: true }
});

export default model("Product", ProductSchema);