import { users } from '../models/usersModel.js';

export const getUsers = async (req, res, next) => {
    const data = await users.find();
    res.json(data);
};

export const addUsers = async (req, res, next) => {
    const body = req.body;
    const data = await users(body);
    data.save();
    res.json(data);
};

export const findIdUsers = async (req, res, next) => {
    const body = req.body;
    const data = await users.find({ id: body.id });
    res.json(data);
};
