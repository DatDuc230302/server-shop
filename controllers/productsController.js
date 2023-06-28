import { popularSearch, products } from '../models/productsModel.js';

export const addProducts = async (req, res, next) => {
    const body = req.body;
    const data = await products(body);
    data.save();
    res.json({ status: true });
};

// Query
export const queryAll = async (req, res, next) => {
    const pageSize = req.query.pageSize;
    const pageNum = req.query.pageNum <= 0 ? 1 : req.query.pageNum;
    const skipAmount = pageSize * (pageNum - 1);
    const priceMin = Number(req.query.priceMin);
    const priceMax = Number(req.query.priceMax) === 0 ? 100000000 : Number(req.query.priceMax);
    const result = await products
        .find({ price: { $gt: priceMin, $lt: priceMax } })
        .skip(skipAmount)
        .limit(pageSize);
    const totalProducts = await products.find({ price: { $gt: priceMin, $lt: priceMax } });
    // Lấy dữ liệu phân trang

    res.json({
        totalProducts: totalProducts,
        result: result,
    });
};
export const queryOnlyAll = async (req, res, next) => {
    const pageSize = req.query.pageSize;
    const pageNum = req.query.pageNum <= 0 ? 1 : req.query.pageNum;
    const skipAmount = pageSize * (pageNum - 1);
    const result = await products.find().skip(skipAmount).limit(pageSize);
    const totalProducts = await products.find();

    res.json({
        totalProducts: totalProducts,
        result: result,
    });
};
export const queryName = async (req, res, next) => {
    const name = req.query.name;
    const pageSize = req.query.pageSize;
    const pageNum = req.query.pageNum <= 0 ? 1 : req.query.pageNum;
    const skipAmount = pageSize * (pageNum - 1);
    const priceMin = Number(req.query.priceMin);
    const priceMax = Number(req.query.priceMax) <= 0 ? 100000000 : Number(req.query.priceMax);
    const result = await products
        .find({
            $and: [{ name: { $regex: name, $options: 'i' } }, { price: { $gt: priceMin, $lt: priceMax } }],
        })
        .skip(skipAmount)
        .limit(pageSize);

    // Count Total Products
    const totalProducts = await products.find({
        $and: [{ name: { $regex: name, $options: 'i' } }, { price: { $gt: priceMin, $lt: priceMax } }],
    });

    // Return Json to Front End
    res.json({
        totalProducts: totalProducts,
        result: result,
    });
};
export const queryOnlyName = async (req, res, next) => {
    const name = req.query.name;
    const pageNum = !req.query.pageNum ? 1 : Number(req.query.pageNum);
    const pageSize = !req.query.pageSize ? 1000000 : req.query.pageSize;
    const skipAmount = pageSize * (pageNum - 1);
    const result = await products
        .find({
            $or: [{ name: { $regex: name, $options: 'i' } }],
        })
        .skip(skipAmount)
        .limit(pageSize);
    const totalProducts = await products.find({
        $or: [{ name: { $regex: name, $options: 'i' } }],
    });
    res.json({
        result: result,
        totalProducts: totalProducts,
    });
};
export const queryCate = async (req, res, next) => {
    const category = req.query.category;
    const pageSize = Number(req.query.pageSize);
    const pageNum = Number(req.query.pageNum);
    const skipAmount = pageSize * (pageNum - 1);
    const priceMin = Number(req.query.priceMin);
    const priceMax = Number(req.query.priceMax) <= 0 ? 100000000 : Number(req.query.priceMax);
    const result = await products
        .find({
            $and: [{ category: { $regex: category, $options: 'i' } }, { price: { $gt: priceMin, $lt: priceMax } }],
        })
        .skip(skipAmount)
        .limit(pageSize);

    const totalProducts = await products.find({
        $and: [{ category: { $regex: category, $options: 'i' } }, { price: { $gt: priceMin, $lt: priceMax } }],
    });

    res.json({
        totalProducts: totalProducts,
        result: result,
    });
};
export const queryOnlyCate = async (req, res, next) => {
    const category = req.query.category;
    const result = await products.find({ category: category });
    res.json(result);
};
export const queryNameCate = async (req, res, next) => {
    const name = req.query.name;
    const category = req.query.category;
    const pageSize = req.query.pageSize;
    const pageNum = req.query.pageNum;
    const skipAmount = pageSize * (pageNum - 1);
    const priceMin = Number(req.query.priceMin);
    const priceMax = Number(req.query.priceMax) <= 0 ? 100000000 : Number(req.query.priceMax);
    const result = await products
        .find({
            $and: [
                { name: { $regex: name, $options: 'i' } },
                { category: category },
                { price: { $gt: priceMin, $lt: priceMax } },
            ],
        })
        .skip(skipAmount)
        .limit(pageSize);

    const totalProducts = await products.find({
        $and: [
            { name: { $regex: name, $options: 'i' } },
            { category: category },
            { price: { $gt: priceMin, $lt: priceMax } },
        ],
    });

    res.json({
        totalProducts: totalProducts,
        result: result,
    });
};

// Search Name

// Query Id
export const queryId = async (req, res, next) => {
    const id = req.query.id;
    const result = await products.find({ _id: id });
    res.json(result);
};

// Query All Id
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
export const sortDateNameCate = async (req, res, next) => {
    const name = !req.query.name ? '' : req.query.name;
    const category = req.query.category;
    const pageSize = !req.query.pageSize ? 100000 : req.query.pageSize;
    const pageNum = !req.query.pageNum ? 1 : req.query.pageNum;
    const skipAmount = pageSize * (pageNum - 1);
    const priceMin = !Number(req.query.priceMin) ? 0 : Number(req.query.priceMin);
    const priceMax = Number(req.query.priceMax) === 0 ? 100000000 : Number(req.query.priceMax);
    let totalProducts;
    let result;
    if (category !== 'undefined') {
        if (name.length > 0) {
            // Sort Date Name Category
            result = await products
                .find({
                    $and: [
                        { name: { $regex: name, $options: 'i' } },
                        { category: category },
                        { price: { $gt: priceMin, $lt: priceMax } },
                    ],
                })
                .sort({ createdAt: -1 })
                .skip(skipAmount)
                .limit(pageSize);
            totalProducts = await products
                .find({
                    $and: [
                        { name: { $regex: name, $options: 'i' } },
                        { category: category },
                        { price: { $gt: priceMin, $lt: priceMax } },
                    ],
                })
                .sort({ createdAt: -1 });
        } else {
            // Sort Date Cate
            result = await products
                .find({ $and: [{ category: category }, { price: { $gt: priceMin, $lt: priceMax } }] })
                .sort({ createdAt: -1 })
                .skip(skipAmount)
                .limit(pageSize);

            totalProducts = await products
                .find({ $and: [{ category: category }, { price: { $gt: priceMin, $lt: priceMax } }] })
                .sort({ createdAt: -1 });
        }
    } else {
        if (name.length > 0) {
            // Sort Date Name
            result = await products
                .find({
                    $and: [{ name: { $regex: name, $options: 'i' } }, { price: { $gt: priceMin, $lt: priceMax } }],
                })
                .sort({ createdAt: -1 })
                .skip(skipAmount)
                .limit(pageSize);
            totalProducts = await products.find({
                $and: [{ name: { $regex: name, $options: 'i' } }, { price: { $gt: priceMin, $lt: priceMax } }],
            });
        } else {
            // Sort Date All
            result = await products
                .find({ price: { $gt: priceMin, $lt: priceMax } })
                .sort({ createdAt: -1 })
                .skip(skipAmount)
                .limit(pageSize);
            totalProducts = await products.find({ price: { $gt: priceMin, $lt: priceMax } });
        }
    }
    res.json({
        result: result,
        totalProducts: totalProducts,
    });
};
export const sortDateOnlyCate = async (req, res, next) => {
    const category = req.query.category;
    const result = await products.find({ category: category }).sort({ createdAt: -1 });
    res.json(result);
};

// Sort Price Lowest
export const sortLowestNameCate = async (req, res, next) => {
    const name = req.query.name;
    const category = req.query.category;
    const pageSize = req.query.pageSize;
    const pageNum = req.query.pageNum;
    const skipAmount = pageSize * (pageNum - 1);
    const priceMin = Number(req.query.priceMin);
    const priceMax = Number(req.query.priceMax) === 0 ? 100000000 : Number(req.query.priceMax);
    let totalProducts;
    let result;
    if (category !== 'undefined') {
        if (name.length > 0) {
            // Sort Lowest Name Category
            result = await products
                .find({
                    $and: [
                        { name: { $regex: name, $options: 'i' } },
                        { category: category },
                        { price: { $gt: priceMin, $lt: priceMax } },
                    ],
                })
                .sort({ price: 1 })
                .skip(skipAmount)
                .limit(pageSize);
            totalProducts = await products
                .find({
                    $and: [
                        { name: { $regex: name, $options: 'i' } },
                        { category: category },
                        { price: { $gt: priceMin, $lt: priceMax } },
                    ],
                })
                .sort({ price: 1 });
        } else {
            // Sort Lowest Cate
            result = await products
                .find({ $and: [{ category: category }, { price: { $gt: priceMin, $lt: priceMax } }] })
                .sort({ price: 1 })
                .skip(skipAmount)
                .limit(pageSize);

            totalProducts = await products
                .find({ $and: [{ category: category }, { price: { $gt: priceMin, $lt: priceMax } }] })
                .sort({ price: 1 });
        }
    } else {
        if (name.length > 0) {
            // Sort Lowest Name
            result = await products
                .find({
                    $and: [{ name: { $regex: name, $options: 'i' } }, { price: { $gt: priceMin, $lt: priceMax } }],
                })
                .sort({ price: 1 })
                .skip(skipAmount)
                .limit(pageSize);
            totalProducts = await products.find({
                $and: [{ name: { $regex: name, $options: 'i' } }, { price: { $gt: priceMin, $lt: priceMax } }],
            });
        } else {
            // Sort Lowest All
            result = await products
                .find({ price: { $gt: priceMin, $lt: priceMax } })
                .sort({ price: 1 })
                .skip(skipAmount)
                .limit(pageSize);
            totalProducts = await products.find({ price: { $gt: priceMin, $lt: priceMax } });
        }
    }
    res.json({
        result: result,
        totalProducts: totalProducts,
    });
};

// Sort Price Highest
export const sortHighestNameCate = async (req, res, next) => {
    const name = req.query.name;
    const category = req.query.category;
    const pageSize = req.query.pageSize;
    const pageNum = req.query.pageNum <= 0 ? 1 : req.query.pageNum;
    const skipAmount = pageSize * (pageNum - 1);
    const priceMin = Number(req.query.priceMin);
    const priceMax = Number(req.query.priceMax) === 0 ? 100000000 : Number(req.query.priceMax);
    let totalProducts;
    let result;
    if (category !== 'undefined') {
        if (name.length > 0) {
            // Sort Lowest Name Category
            result = await products
                .find({
                    $and: [
                        { name: { $regex: name, $options: 'i' } },
                        { category: category },
                        { price: { $gt: priceMin, $lt: priceMax } },
                    ],
                })
                .sort({ price: -1 })
                .skip(skipAmount)
                .limit(pageSize);
            totalProducts = await products
                .find({
                    $and: [
                        { name: { $regex: name, $options: 'i' } },
                        { category: category },
                        { price: { $gt: priceMin, $lt: priceMax } },
                    ],
                })
                .sort({ price: -1 });
        } else {
            // Sort Lowest Cate
            result = await products
                .find({ $and: [{ category: category }, { price: { $gt: priceMin, $lt: priceMax } }] })
                .sort({ price: -1 })
                .skip(skipAmount)
                .limit(pageSize);

            totalProducts = await products
                .find({ $and: [{ category: category }, { price: { $gt: priceMin, $lt: priceMax } }] })
                .sort({ price: -1 });
        }
    } else {
        if (name.length > 0) {
            // Sort Lowest Name
            result = await products
                .find({
                    $and: [{ name: { $regex: name, $options: 'i' } }, { price: { $gt: priceMin, $lt: priceMax } }],
                })
                .sort({ price: -1 })
                .skip(skipAmount)
                .limit(pageSize);
            totalProducts = await products.find({
                $and: [{ name: { $regex: name, $options: 'i' } }, { price: { $gt: priceMin, $lt: priceMax } }],
            });
        } else {
            // Sort Lowest All
            result = await products
                .find({ price: { $gt: priceMin, $lt: priceMax } })
                .sort({ price: -1 })
                .skip(skipAmount)
                .limit(pageSize);
            totalProducts = await products.find({ price: { $gt: priceMin, $lt: priceMax } });
        }
    }
    res.json({
        result: result,
        totalProducts: totalProducts,
    });
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
