import mongoose from 'mongoose';

const schema = new mongoose.Schema(
    {
        id: String,
        name: String,
        avatar: String,
        rule: Number,
        email: String,
        carts: Array,
    },
    { timestamps: true },
);

export const users = mongoose.model('users', schema);