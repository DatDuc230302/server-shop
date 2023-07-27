import mongoose from 'mongoose';

const schema = new mongoose.Schema(
    {
        userId: String,
        keys: Array,
    },
    { timestamps: true },
);

export const userKeys = mongoose.model('userKeys', schema);
