import { model, Schema } from 'mongoose';

const ProductSchema = new Schema({
    name: String,
    category: String,
    price: Number,
    inStock: Boolean,
    tags: [String]
}, {timestamps: true});

export default model('Product', ProductSchema);