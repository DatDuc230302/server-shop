import { users, usersAvatars } from '../models/usersModel.js';

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

export const queryId = async (req, res, next) => {
    const id = req.query.id;
    const data = await users.find({ id: id });
    res.json(data);
};

export const checkAdmin = async (req, res, next) => {
    const uid = req.query.uid;
    const data = await users.find({ $and: [{ id: uid }, { rule: 0 }] });
    if (data.length > 0) {
        res.json({ status: true });
    } else {
        res.json({ status: false });
    }
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
    res.json();
};

export const updateCarts = async (req, res, next) => {
    const body = req.body;
    const data = await users.findOne({ id: body.id }, { carts: 1 });
    const quantity = body.newArr.length;
    const lenArr = data.carts.filter((it) => it === body.item).length;
    let count = 0;
    const filteredArr = data.carts.filter((obj) => {
        if (obj === body.item) {
            count++;
            return count <= quantity;
        }
        return true;
    });

    if (lenArr > quantity) {
        await users
            .findOneAndUpdate({ id: body.id }, { carts: filteredArr }, { new: true })
            .then((updatedDocument) => {
                updatedDocument;
            })
            .catch((error) => {
                error;
            });
        res.json();
    } else {
        for (let i = 0; i < quantity - lenArr; i++) {
            data.carts.push(body.item);
        }
        await users
            .findOneAndUpdate({ id: body.id }, { carts: data.carts }, { new: true })
            .then((updatedDocument) => {
                updatedDocument;
            })
            .catch((error) => {
                error;
            });
        res.json();
    }
};

export const deleteCarts = async (req, res, next) => {
    const body = req.body;

    await users
        .updateMany({}, { $pull: { carts: body.item } })
        .then((result) => {
            result;
        })
        .catch((error) => {
            error;
        });
    res.json();
};

export const updateAvatar = async (req, res, next) => {
    const body = req.body;
    await users.findOneAndUpdate(
        { id: body.idUser }, // Điều kiện tìm kiếm dựa trên name
        { avatar: body.avatar }, // Trường cần cập nhật (img)
        { new: true }, // Tùy chọn để trả về bản ghi đã cập nhật
    );
    res.json();
};

// Avatars

export const getAvatars = async (req, res, next) => {
    const data = await usersAvatars.find();
    res.json(data);
};
