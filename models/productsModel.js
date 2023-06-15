import mongoose from 'mongoose';

const schema = new mongoose.Schema(
    {
        name: String,
        price: Number,
        discount: Number,
        priceDiscount: Number,
        title: String,
        description: String,
        category: String,
        img: String,
        sold: Number,
    },
    { timestamps: true },
);

export const products = mongoose.model('products', schema);
