import { carts } from '../models/cartsModel.js';
import { products } from '../models/productsModel.js';

export const checkIdUser = async (req, res, next) => {
    try {
        const { idUser } = req.query || req.body;
        if (idUser) {
            next();
        } else {
            console.log('idUser is undefined');
        }
    } catch {
        console.log('Error');
    }
};

export const addCarts = async (req, res) => {
    try {
        const { idUser } = req.body;
        const existingCart = await carts.findOne({ idUser });
        if (existingCart) {
            res.json({ message: 'Cart already exists for the provided idUser' });
        } else {
            const result = await carts({ idUser: idUser, products: [] });
            result.save();
            res.json({
                message: 'successfully',
            });
        }
    } catch {
        console.log('Error');
    }
};

export const updateProductsCarts = async (req, res) => {
    try {
        const { idUser, idProduct } = req.body;
        if (idUser && idProduct) {
            const getKeyFromProduct = await products.findOne({ _id: idProduct }, { keys: 1 });
            getKeyFromProduct.save();
            const keyProduct = getKeyFromProduct.keys.shift();
            if (keyProduct) {
                await carts.updateOne(
                    { idUser },
                    { $push: { products: { idProduct: idProduct, key: keyProduct, odreredAt: new Date() } } },
                );
                res.status(200).json({ message: 'successfully' });
            } else {
                res.status(200).json({ message: 'fail' });
            }
        }
    } catch {
        console.log('Error');
    }
};

export const getCarts = async (req, res) => {
    try {
        const { idUser } = req.query;
        const result = await carts.findOne({ idUser: idUser });
        res.status(200).json({
            messgae: 'successfully',
            result: result,
        });
    } catch {
        console.log('Error');
    }
};

export const deleteAllByIdProducts = async (req, res) => {
    try {
        const { idProduct, idUser } = req.body;
        await carts.findOneAndUpdate({ idUser: idUser }, { $pull: { products: { idProduct: idProduct } } });
        res.status(200).json({ message: 'successfully' });
    } catch {
        console.log('Error');
    }
};
