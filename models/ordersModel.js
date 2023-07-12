import mongoose from 'mongoose';

const schema = new mongoose.Schema(
    {
        userId: String,
        userName: String,
        userEmail: String,
        products: Array,
        totalPrice: Number,
        status: Number,
    },
    { timestamps: true },
);

export const orders = mongoose.model('orders', schema);
