import express from 'express';
import {
    // Middleware
    checkIdProduct,

    // Products Database
    addProducts,
    updateProductById,
    addKey,
    deleteKey,
    getKey,
    returnKeys,

    // Methods Query
    queryAll,
    queryOnlyAll,
    queryName,
    queryOnlyName,
    queryCate,
    queryOnlyCate,
    queryNameCate,
    // Methos Sort
    sortDateNameCate,
    sortDateOnlyCate,
    sortLowestNameCate,
    sortHighestNameCate,
    // Methods Query Custom
    queryId,
    findAllById,
    querySelling,
    queryTrending,
    findIdAndUpdateViews,
    querySoldCate,
    queryType,
    queryLtPrice,

    // PopularSearch Database
    getPopularSearch,
    addPopularSearch,
} from '../controllers/productsController.js';

const productsRouter = express.Router();

// Products Database
productsRouter.post('/products/add', addProducts);
productsRouter.post('/products/updateProductById', updateProductById);

// Keys
productsRouter.post('/products/addKey', addKey);
productsRouter.post('/products/deleteKey', deleteKey);
productsRouter.get('/products/getKey', getKey);
productsRouter.post('/products/returnKeys', checkIdProduct, returnKeys);

// Methods Query
productsRouter.get('/products/queryAll', queryAll);
productsRouter.get('/products/queryOnlyAll', queryOnlyAll);
productsRouter.get('/products/queryName', queryName);
productsRouter.get('/products/queryOnlyName', queryOnlyName);
productsRouter.get('/products/queryCate', queryCate);
productsRouter.get('/products/queryOnlyCate', queryOnlyCate);
productsRouter.get('/products/queryNameCate', queryNameCate);
//Search Name
//
productsRouter.get('/products/queryId', queryId);
productsRouter.post('/products/findAllById', findAllById);
// Methods Sort
productsRouter.get('/products/sortDateNameCate', sortDateNameCate);
productsRouter.get('/products/sortDateOnlyCate', sortDateOnlyCate);
productsRouter.get('/products/sortLowestNameCate', sortLowestNameCate);
productsRouter.get('/products/sortHighestNameCate', sortHighestNameCate);
// Query Custom
productsRouter.get('/products/querySelling', querySelling);
productsRouter.get('/products/queryTrending', queryTrending);
productsRouter.post('/products/findIdAndUpdateViews', findIdAndUpdateViews);
productsRouter.get('/products/querySoldCate', querySoldCate);
productsRouter.get('/products/queryType', queryType);
productsRouter.get('/products/queryLtPrice', queryLtPrice);

// PopularSearches Database
productsRouter.get('/products/popularSearch/get', getPopularSearch);
productsRouter.post('/products/popularSearch/add', addPopularSearch);

// Carts Database

export default productsRouter;
