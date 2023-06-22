import { popularSearch, products } from '../models/productsModel.js';

export const getProducts = async (req, res, next) => {
    const pageSize = req.query.pageSize;
    const pageNum = req.query.pageNum;
    const skipAmount = pageSize * (pageNum - 1);
    const data = await products.find().skip(skipAmount).limit(pageSize);
    const totalProducts = await products.countDocuments();
    // Lấy dữ liệu phân trang

    res.json({
        totalProducts: totalProducts,
        data: data,
    });
};

export const addProducts = async (req, res, next) => {
    const body = req.body;
    const data = await products(body);
    data.save();
    res.json({ status: true });
};

// Query
export const queryName = async (req, res, next) => {
    const name = req.query.query;
    const result = await products.find({
        $or: [{ name: { $regex: name, $options: 'i' } }],
    });
    res.json(result);
};
export const queryCate = async (req, res, next) => {
    const category = req.query.category;
    const result = await products.find({
        $or: [{ category: { $regex: category, $options: 'i' } }],
    });
    res.json(result);
};
export const queryNameCate = async (req, res, next) => {
    const name = req.query.name;
    const category = req.query.category;
    const result = await products.find({
        $and: [{ name: { $regex: name, $options: 'i' } }, { category: category }],
    });
    res.json(result);
};

// Query
export const queryId = async (req, res, next) => {
    const id = req.query.id;
    const result = await products.find({ _id: id });
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

// Sort Date
export const sortDateName = async (req, res, next) => {
    const name = req.query.name;
    const result = await products
        .find({
            $or: [{ name: { $regex: name, $options: 'i' } }],
        })
        .sort({ createdAt: -1 })
        .res.json(result);
};
export const sortDateCate = async (req, res, next) => {
    const category = req.query.category;
    const result = await products
        .find({
            $or: [{ category: { $regex: category, $options: 'i' } }],
        })
        .sort({ createdAt: -1 });
    res.json(result);
};
export const sortDateNameCate = async (req, res, next) => {
    const name = req.query.name;
    const category = req.query.category;
    const result = await products
        .find({
            $and: [{ name: { $regex: name, $options: 'i' } }, { category: category }],
        })
        .sort({ createdAt: -1 });
    res.json(result);
};

// Sort Price Lowest
export const sortLowestName = async (req, res, next) => {
    const name = req.query.name;
    const result = await products
        .find({
            $or: [{ name: { $regex: name, $options: 'i' } }],
        })
        .sort({ price: 1 });
    res.json(result);
};
export const sortLowestCate = async (req, res, next) => {
    const category = req.query.category;
    const result = await products
        .find({
            $or: [{ category: { $regex: category, $options: 'i' } }],
        })
        .sort({ price: 1 });
    res.json(result);
};
export const sortLowestNameCate = async (req, res, next) => {
    const name = req.query.name;
    const category = req.query.category;
    const result = await products
        .find({
            $and: [{ name: { $regex: name, $options: 'i' } }, { category: category }],
        })
        .sort({ price: 1 });
    res.json(result);
};

// Sort Price Highest
export const sortHighestName = async (req, res, next) => {
    const name = req.query.name;
    const result = await products
        .find({
            $or: [{ name: { $regex: name, $options: 'i' } }],
        })
        .sort({ price: -1 });
    res.json(result);
};
export const sortHighestCate = async (req, res, next) => {
    const category = req.query.categor;
    const result = await products
        .find({
            $or: [{ category: { $regex: category, $options: 'i' } }],
        })
        .sort({ price: -1 });
    res.json(result);
};
export const sortHighestNameCate = async (req, res, next) => {
    const name = req.query.name;
    const category = req.query.category;
    const result = await products
        .find({
            $and: [{ name: { $regex: name, $options: 'i' } }, { category: category }],
        })
        .sort({ price: -1 });
    res.json(result);
};

// Sort Price Between
export const sortBetweenPriceName = async (req, res, next) => {
    const name = req.query.name;
    const priceMin = req.query.priceMin;
    const priceMax = req.query.priceMax;
    const result = await products.find({
        $and: [{ name: { $regex: name, $options: 'i' } }, { price: { $gt: priceMin, $lt: priceMax } }],
    });
    res.json(result);
};
export const sortBetweenPriceCate = async (req, res, next) => {
    const category = req.query.category;
    const priceMin = req.query.priceMin;
    const priceMax = req.query.priceMax;
    const result = await products.find({
        $and: [{ category: category }, { price: { $gt: priceMin, $lt: priceMax } }],
    });
    res.json(result);
};
export const sortBetweenPriceNameCate = async (req, res, next) => {
    const name = req.query.name;
    const category = req.query.category;
    const priceMin = req.query.priceMin;
    const priceMax = req.query.priceMax;
    const result = await products.find({
        $and: [
            { name: { $regex: name, $options: 'i' } },
            { category: category },
            { price: { $gt: priceMin, $lt: priceMax } },
        ],
    });
    res.json(result);
};
//
export const querySelling = async (req, res, next) => {
    const quantity = req.query.quantity;
    const result = await products
        .find({}, 'name price discount priceDiscount img sold')
        .sort({ sold: -1 })
        .limit(quantity);
    res.json(result);
};
export const queryTrending = async (req, res, next) => {
    const quantity = req.query.quantity;
    const result = await products
        .find({}, '_id name price title discount priceDiscount img views')
        .sort({ views: -1 })
        .limit(quantity);
    res.json(result);
};

export const findAndUpdateViews = async (req, res, next) => {
    const body = req.body;
    await products.findOneAndUpdate({ _id: body.id }, { $inc: { views: 1 } }, { upsert: true, new: true });
    const result = await products.find({ _id: body.id });
    res.json(result);
};

export const querySoldCate = async (req, res, next) => {
    const category = req.query.category;
    const quantity = req.query.quantity;
    const result = await products.find({ category: category }).sort({ sold: -1 }).limit(quantity);
    res.json(result);
};

export const queryNote = async (req, res, next) => {
    const note = req.query.note;
    const result = await products.find({ note: note }, '_id name price title discount priceDiscount img views');
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
