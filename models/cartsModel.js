import mongoose from 'mongoose';

const schema = new mongoose.Schema(
    {
        idUser: String,
        products: Array,
    },
    { timestamps: true },
);

export const carts = mongoose.model('carts', schema);
