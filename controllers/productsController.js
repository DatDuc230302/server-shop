import { popularSearch, products } from '../models/productsModel.js';

export const getProducts = async (req, res, next) => {
    const data = await products.find();
    res.json(data);
};

export const addProducts = async (req, res, next) => {
    const body = req.body;
    const data = await products(body);
    data.save();
    res.json({ status: true });
};

export const findId = async (req, res, next) => {
    const result = await products.find({ _id: req.body.id });
    res.json(result);
};

export const findName = async (req, res, next) => {
    const result = await products.find({
        $or: [{ name: { $regex: req.body.key, $options: 'i' } }],
    });
    res.json(result);
};

export const findNameCate = async (req, res, next) => {
    const result = await products.find({
        $or: [{ category: { $regex: req.body.category, $options: 'i' } }],
    });
    res.json(result);
};

export const findNameCateAndQuery = async (req, res, next) => {
    const result = await products.find({
        $and: [{ category: req.body.category }, { name: { $regex: req.body.key, $options: 'i' } }],
    });
    res.json(result);
};

export const findAllById = async (req, res, next) => {
    const result = [];
    const arrId = req.body.arrId;
    for (const item of arrId) {
        const foundItem = await products.findOne({ _id: item });
        result.push(foundItem);
    }
    res.json(result);
};

export const sortDate = async (req, res, next) => {
    const result = await products
        .find({
            $or: [{ name: { $regex: req.body.key, $options: 'i' } }],
        })
        .sort({ createdAt: -1 });
    res.json(result);
};

export const sortDateCate = async (req, res, next) => {
    const result = await products
        .find({
            $or: [{ category: { $regex: req.body.category, $options: 'i' } }],
        })
        .sort({ createdAt: -1 });
    res.json(result);
};

export const sortDateCateAndQuery = async (req, res, next) => {
    const result = await products
        .find({
            $and: [{ category: req.body.category }, { name: { $regex: req.body.key, $options: 'i' } }],
        })
        .sort({ createdAt: -1 });
    res.json(result);
};

export const sortLowest = async (req, res, next) => {
    const result = await products
        .find({
            $or: [{ name: { $regex: req.body.key, $options: 'i' } }],
        })
        .sort({ price: 1 });
    res.json(result);
};

export const sortLowestCate = async (req, res, next) => {
    const result = await products
        .find({
            $or: [{ category: { $regex: req.body.category, $options: 'i' } }],
        })
        .sort({ price: 1 });
    res.json(result);
};

export const sortLowestCateAndQuery = async (req, res, next) => {
    const result = await products
        .find({
            $and: [{ category: req.body.category }, { name: { $regex: req.body.key, $options: 'i' } }],
        })
        .sort({ price: 1 });
    res.json(result);
};

export const sortHighest = async (req, res, next) => {
    const result = await products
        .find({
            $or: [{ name: { $regex: req.body.key, $options: 'i' } }],
        })
        .sort({ price: -1 });
    res.json(result);
};

export const sortHighestCate = async (req, res, next) => {
    const result = await products
        .find({
            $or: [{ category: { $regex: req.body.category, $options: 'i' } }],
        })
        .sort({ price: -1 });
    res.json(result);
};

export const sortHighestCateAndQuery = async (req, res, next) => {
    const result = await products
        .find({
            $and: [{ category: req.body.category }, { name: { $regex: req.body.key, $options: 'i' } }],
        })
        .sort({ price: -1 });
    res.json(result);
};

export const sortBetweenPrice = async (req, res, next) => {
    const result = await products.find({
        $and: [
            { price: { $gt: req.body.priceMin, $lt: req.body.priceMax } },
            { name: { $regex: req.body.key, $options: 'i' } },
        ],
    });
    res.json(result);
};

export const sortBetweenPriceCate = async (req, res, next) => {
    const result = await products.find({
        $and: [{ price: { $gt: req.body.priceMin, $lt: req.body.priceMax } }, { category: req.body.category }],
    });
    res.json(result);
};

export const sortBetweenPriceCateAndQuery = async (req, res, next) => {
    const result = await products.find({
        $and: [
            { price: { $gt: req.body.priceMin, $lt: req.body.priceMax } },
            { category: req.body.category },
            { name: { $regex: req.body.key, $options: 'i' } },
        ],
    });
    res.json(result);
};

export const getSelling = async (req, res, next) => {
    const body = req.body;
    const result = await products
        .find({}, 'name price discount priceDiscount img sold')
        .sort({ sold: -1 })
        .limit(body.quantity);
    res.json(result);
};

export const getTrending = async (req, res, next) => {
    const result = await products
        .find({}, '_id name price title discount priceDiscount img views')
        .sort({ views: -1 })
        .limit(12);
    res.json(result);
};

export const findAndUpdateViews = async (req, res, next) => {
    const body = req.body;
    await products.findOneAndUpdate({ _id: body.id }, { $inc: { views: 1 } }, { upsert: true, new: true });
    const result = await products.find({ _id: body.id });
    res.json(result);
};

export const findBestCate = async (req, res, next) => {
    const body = req.body;
    const result = await products.find({ category: body.category }).sort({ sold: -1 }).limit(body.quantity);
    res.json(result);
};

export const findSoldCate = async (req, res, next) => {
    const body = req.body;
    const result = await products
        .find({ category: body.category }, '_id name price title discount priceDiscount img views')
        .sort({ sold: -1 });
    res.json(result);
};

// popularSearches

export const getPopularSearch = async (req, res, next) => {
    const result = await popularSearch.find().sort({ quantity: -1 }).limit(6);
    res.json(result);
};

export const addPopularSearch = async (req, res, next) => {
    const body = req.body;
    await popularSearch.findOneAndUpdate({ name: body.name }, { $inc: { quantity: 1 } }, { upsert: true, new: true });
    res.json();
};
