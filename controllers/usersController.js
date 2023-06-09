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

export const addCarts = async (req, res, next) => {
    const body = req.body;
    const data = users
        .findOneAndUpdate({ id: body.id }, { $push: { carts: body.item } }, { new: true })
        .exec()
        .then((updatedUser) => {
            updatedUser;
        })
        .catch((err) => {
            console.error(err);
        });
    res.json('OK');
};
