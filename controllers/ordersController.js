import { orders } from '../models/ordersModel.js';
import { users } from '../models/usersModel.js';
import { products } from '../models/productsModel.js';

export const checkUserId = async (req, res, next) => {
    try {
        const { userId } = req.body;
        if (userId) {
            next();
        } else {
            console.log('Error');
        }
    } catch {
        console.log('Erorr');
    }
};

export const getOrders = async (req, res) => {
    try {
        const { userId } = req.query;

        if (userId) {
            const result = await orders.findOne({ userId: userId, status: 0 });
            res.status(200).json({
                result: result,
                message: 'successfully',
            });
        } else {
            res.status(500).jon({
                message: 'fail',
            });
        }
    } catch {
        console.log('Error');
    }
};

export const getOrdered = async (req, res) => {
    try {
        const { userId } = req.query;
        if (userId) {
            const result = await orders.find({ userId: userId, status: 1 });
            res.status(200).json({
                result: result,
                message: 'successfully',
            });
        } else {
            res.status(500).jon({
                message: 'fail',
            });
        }
    } catch {
        console.log('Error');
    }
};

export const addOrders = async (req, res) => {
    try {
        const { userId, productsFromCarts, totalPrice } = req.body;
        const infoUser = await users.findOne({ id: userId });

        const getOrder = await orders.findOne({ userId: userId }).sort({ createdAt: -1 }).limit(1);

        let result;
        if (getOrder) {
            if (getOrder.status === 1) {
                result = await orders({
                    userId: infoUser.id,
                    userName: infoUser.name,
                    userEmail: infoUser.email,
                    products: productsFromCarts,
                    totalPrice: totalPrice,
                    status: 0,
                });
                result.save();
            } else {
                await orders.findOneAndUpdate(
                    { userId: infoUser.id },
                    { $set: { products: productsFromCarts, totalPrice: totalPrice } },
                    { new: true, sort: { createdAt: -1 } },
                );
            }
        } else {
            result = await orders({
                userId: infoUser.id,
                userName: infoUser.name,
                userEmail: infoUser.email,
                products: productsFromCarts,
                totalPrice: totalPrice,
                status: 0,
            });
            result.save();
        }

        res.status(200).json({
            message: 'successfully',
        });
    } catch {
        console.log('Error');
    }
};

export const updateStatus = async (req, res) => {
    try {
        const { userId } = req.body;
        await orders.findOneAndUpdate(
            { status: 0, userId: userId }, // Điều kiện tìm kiếm
            { $set: { status: 1 } }, // Các trường muốn cập nhật
            { new: true }, // Tùy chọn này để trả về bản ghi sau khi đã cập nhật
        );

        res.status(200).json({
            message: 'successfully',
        });
    } catch {
        console.log('Error');
    }
};
