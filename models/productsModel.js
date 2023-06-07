import mongoose from 'mongoose';

const schema = new mongoose.Schema(
    {
        name: String,
        price: Number,
        discount: Number,
        title: String,
        description: String,
        category: String,
        img: String,
    },
    { timestamps: true },
);

export const products = mongoose.model('products', schema);
