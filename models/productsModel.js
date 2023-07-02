import mongoose from 'mongoose';

const schema = new mongoose.Schema(
    {
        name: String,
        price: Number,
        discount: Number,
        priceDiscount: Number,
        title: String,
        description: String,
        type: String,
        category: String,
        img: String,
        sold: Number,
        views: Number,
        keys: Array,
    },
    { timestamps: true },
);

export const products = mongoose.model('products', schema);

const schema1 = new mongoose.Schema(
    {
        name: String,
        quantity: Number,
    },
    { timestamps: true },
);

export const popularSearch = mongoose.model('popularSearch', schema1);
