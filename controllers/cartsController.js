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
        const { idUser, idProduct, nameProduct } = req.body;
        if (idUser && idProduct) {
            const getKeyFromProduct = await products.findOne({ _id: idProduct }, { keys: 1 });
            getKeyFromProduct.save();
            const keyProduct = getKeyFromProduct.keys.shift();
            if (keyProduct) {
                await carts.updateOne(
                    { idUser },
                    {
                        $push: {
                            products: {
                                $each: [
                                    {
                                        idProduct: idProduct,
                                        key: keyProduct,
                                        nameProduct: nameProduct,
                                        orderedAt: new Date(),
                                    },
                                ],
                                $position: 0,
                            },
                        },
                    },
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

export const updateChangeProductsCarts = async (req, res) => {
    try {
        const { idUser, idProduct, nameProduct } = req.body;
        const quantity = Number(req.body.quantity) <= 0 ? 1 : Number(req.body.quantity);
        const getKeysProduct = await products.findOne({ _id: idProduct }, { keys: 1 });
        const keysProduct = getKeysProduct.keys.slice(0, quantity);
        // Sau khi lấy ra quantity cần lấy thì sẽ update lại keys của product hiện tại
        await products.findOneAndUpdate(
            {
                _id: idProduct,
            },
            { $pull: { keys: { $in: keysProduct } } },
        );

        // oldKeysArr
        const oldKeysArr = await carts.findOne({ idUser: idUser });

        // Pull toàn bộ key cũ ra khỏi carts
        const pullArr = await carts.findOneAndUpdate(
            { idUser: idUser },
            { $pull: { products: { idProduct: idProduct } } },
            { new: true },
        );

        // Mảng mới sau khi đã pull hết tất cả idproduct cũ
        const arr = pullArr.products;

        // Tạo một mảng mới gồm gồm các object có idPorduct và key
        let newKeysArr = [];
        keysProduct.forEach((item) => {
            newKeysArr.push({ idProduct: idProduct, key: item, nameProduct: nameProduct, orderedAt: new Date() });
        });

        // Mảng cuối cùng
        const finalKeysArr = newKeysArr.concat(arr);

        if (finalKeysArr.length <= 15) {
            // Thay thế mảng keys cũ bằng mảng keys mới trong tài liệu carts
            await carts.findOneAndUpdate({ idUser: idUser }, { $set: { products: finalKeysArr } }, { new: true });
        } else {
            await carts.findOneAndUpdate(
                { idUser: idUser },
                { $set: { products: oldKeysArr.products } },
                { new: true },
            );

            await products.findOneAndUpdate(
                {
                    _id: idProduct,
                },
                { $push: { keys: { $each: keysProduct } } },
            );

            return res.status(200).json({
                message: 'Cart is full',
            });
        }

        // Nếu keys trong product >
        if (keysProduct.length >= quantity) {
            res.status(200).json({
                message: 'successfully',
            });
        } else {
            res.status(200).json({
                message: 'The key is not enough',
            });
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

export const deleteCart = async (req, res) => {
    try {
        const { idUser } = req.body;
        await carts.findOneAndUpdate({ idUser: idUser }, { $set: { products: [] } });
        res.status(200).json({ message: 'successfully' });
    } catch {
        console.log('Error');
    }
};
