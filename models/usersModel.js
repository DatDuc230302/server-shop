import mongoose from 'mongoose';

const schema = new mongoose.Schema(
    {
        id: String,
        name: String,
        avatar: String,
        rule: Number,
        email: String,
    },
    { timestamps: true },
);

export const users = mongoose.model('users', schema);

const avatars = new mongoose.Schema(
    {
        id: Number,
        url: String,
    },
    { timestamps: true },
);

export const usersAvatars = mongoose.model('usersAvatars', avatars);
