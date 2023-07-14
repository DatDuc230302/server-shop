import { users, usersAvatars } from '../models/usersModel.js';

export const getUsers = async (req, res, next) => {
    const data = await users.find();
    res.json(data);
};

export const addUsers = async (req, res, next) => {
    try {
        const body = req.body;
        const result = await users(body);
        result.save();
        res.json({
            message: 'successfully',
        });
    } catch {
        console.log('Error');
    }
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

export const checkMember = async (req, res, next) => {
    const { id, password } = req.query;
    const data = await users.find({ $and: [{ id: id }, { password: password }] });
    if (data.length > 0) {
        res.json({ message: 'successfully' });
    } else {
        res.json({ message: 'fail' });
    }
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
