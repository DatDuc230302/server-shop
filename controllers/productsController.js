import { popularSearch, products } from '../models/productsModel.js';

// Middleware
export const checkIdProduct = async (req, res, next) => {
    try {
        const { idProduct } = req.body || req.query;
        if (idProduct) {
            next();
        } else {
            console.log('idProduct is undefined');
        }
    } catch {
        console.log('Error');
    }
};

// Products Database
export const addProducts = async (req, res) => {
    const body = req.body;
    const data = await products(body);
    data.save();
    res.json({ status: true });
};

export const updateProductById = async (req, res, next) => {
    try {
        const id = req.body.id;
        const { name, price, discount, priceDiscount, title, description, type, category, img } = req.body;
        const result = await products.findByIdAndUpdate(
            id,
            {
                name,
                price,
                discount,
                priceDiscount,
                title,
                description,
                type,
                category,
                img,
            },
            { new: true },
        );
        if (result) {
            res.status(200).json({ success: true });
        } else {
            res.status(404).json({ success: false });
        }
    } catch (error) {
        next(error);
    }
};
export const addKey = async (req, res) => {
    try {
        const { id, key } = req.body;
        const updatedDoc = await products
            .findOneAndUpdate(
                {
                    _id: id,
                },
                { $push: { keys: key } },
                { new: true },
            )
            .exec();
        res.status(200).json({ status: 200 });
    } catch (err) {
        console.log('Error');
        res.status(404).json({ status: 404 });
    }
};
export const deleteKey = async (req, res) => {
    try {
        const { id, key } = req.body;
        const updatedDoc = await products
            .findOneAndUpdate(
                {
                    _id: id,
                },
                { $pull: { keys: key } },
                { new: true },
            )
            .exec();
        res.status(200).json({ status: 200 });
    } catch (err) {
        console.log(err);
        res.status(200).json({ status: 200 });
    }
};
export const getKey = async (req, res) => {
    try {
        const { idProduct } = req.query;
        const getKeyFromProduct = await products.findOne({ _id: idProduct }, { keys: 1 });
        const keyProduct = getKeyFromProduct.keys.shift();
        res.status(200).json({ message: 'successfully', result: keyProduct });
    } catch {
        console.log('Error');
    }
};

export const returnKeys = async (req, res) => {
    try {
        const { idProduct, returnKeys } = req.body;
        if (returnKeys) {
            await products.findOneAndUpdate({ _id: idProduct }, { $push: { keys: { $each: returnKeys } } });
            res.status(200).json({ message: 'successfully' });
        } else {
            res.status(200).json({ message: 'fail' });
        }
    } catch {
        console.log('Error');
    }
};

// Methods Query
export const queryAll = async (req, res) => {
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
export const queryOnlyAll = async (req, res) => {
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
export const queryName = async (req, res) => {
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
export const queryOnlyName = async (req, res) => {
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
export const queryCate = async (req, res) => {
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
export const queryOnlyCate = async (req, res) => {
    const category = req.query.category;
    const quantity = req.query.quantity;
    let result;
    if (quantity === 'undefinde') {
        result = await products.find({ category: category });
    } else {
        result = await products.find({ category: category }).limit(Number(quantity));
    }
    res.json(result);
};
export const queryNameCate = async (req, res) => {
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

// Query Id
export const queryId = async (req, res) => {
    try {
        const id = req.query.id;
        const result = await products.find({ _id: id });
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404);
        }
    } catch {
        console.log('Error');
    }
};
export const findAllById = async (req, res) => {
    const result = [];
    const arrId = req.body.arrId;
    for (const item of arrId) {
        const foundItem = await products.findOne({ _id: item });
        result.push(foundItem);
    }
    res.json({
        message: 'successfully',
        result: result,
    });
};

// Methos Sort
export const sortDateNameCate = async (req, res) => {
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
export const sortDateOnlyCate = async (req, res) => {
    const category = req.query.category;
    const result = await products.find({ category: category }).sort({ createdAt: -1 });
    res.json(result);
};
export const sortLowestNameCate = async (req, res) => {
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
export const sortHighestNameCate = async (req, res) => {
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

// Methods Query Custom
export const querySelling = async (req, res) => {
    const quantity = req.query.quantity;
    const result = await products
        .find({}, 'name price discount priceDiscount img sold')
        .sort({ sold: -1 })
        .limit(quantity);
    res.json(result);
};
export const queryTrending = async (req, res) => {
    const quantity = req.query.quantity;
    const result = await products
        .find({}, '_id name price title discount priceDiscount img views')
        .sort({ views: -1 })
        .limit(quantity);
    res.json(result);
};

export const findIdAndUpdateViews = async (req, res) => {
    try {
        const { id } = req.body;
        const result = await products.find({ _id: id });
        await products.findOneAndUpdate({ _id: id }, { $inc: { views: 1 } }, { upsert: true, new: true });
        res.status(200).json(result);
    } catch {
        res.json({ status: 404 });
    }
};

export const querySoldCate = async (req, res) => {
    const category = req.query.category;
    const quantity = req.query.quantity;
    const result = await products.find({ category: category }).sort({ sold: -1 }).limit(quantity);
    res.json(result);
};

export const queryType = async (req, res) => {
    const type = req.query.type;
    const result = await products.find({ type: type }, '_id name price title discount priceDiscount img views');
    res.json(result);
};

export const queryLtPrice = async (req, res) => {
    try {
        const gtPrice = Number(req.query.gtPrice);
        const quantity = req.query.quantity;
        let result;
        if (quantity === 'undefined') {
            result = await products.find({ price: { $lt: gtPrice } });
        } else {
            result = await products.find({ price: { $lt: gtPrice } }).limit(Number(quantity));
        }
        res.status(200).json({ result: result });
    } catch {
        console.log('Error');
    }
};

// Popular Searches Database

export const getPopularSearch = async (req, res) => {
    const result = await popularSearch.find().sort({ quantity: -1 }).limit(6);
    res.json(result);
};

export const addPopularSearch = async (req, res) => {
    const body = req.body;
    await popularSearch.findOneAndUpdate({ name: body.name }, { $inc: { quantity: 1 } }, { upsert: true, new: true });
    res.json();
};
