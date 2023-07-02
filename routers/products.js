import express from 'express';
import {
    addProducts,
    updateProductById,
    addKey,
    deleteKey,
    //
    queryAll,
    queryOnlyAll,
    queryName,
    queryOnlyName,
    queryCate,
    queryOnlyCate,
    queryNameCate,
    //
    sortDateNameCate,
    sortDateOnlyCate,
    //
    sortLowestNameCate,
    //
    sortHighestNameCate,
    //
    queryId,
    findAllById,
    querySelling,
    queryTrending,
    findIdAndUpdateViews,
    querySoldCate,
    queryType,

    // PopularSearch
    getPopularSearch,
    addPopularSearch,
} from '../controllers/productsController.js';

const productsRouter = express.Router();

productsRouter.post('/products/add', addProducts);
productsRouter.post('/products/updateProductById', updateProductById);
productsRouter.post('/products/addKey', addKey);
productsRouter.post('/products/deleteKey', deleteKey);
//
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
//
productsRouter.get('/products/sortDateNameCate', sortDateNameCate);
productsRouter.get('/products/sortDateOnlyCate', sortDateOnlyCate);
//
productsRouter.get('/products/sortLowestNameCate', sortLowestNameCate);
//
productsRouter.get('/products/sortHighestNameCate', sortHighestNameCate);
//
productsRouter.get('/products/querySelling', querySelling);
productsRouter.get('/products/queryTrending', queryTrending);
productsRouter.post('/products/findIdAndUpdateViews', findIdAndUpdateViews);
productsRouter.get('/products/querySoldCate', querySoldCate);
productsRouter.get('/products/queryType', queryType);

// PopularSearches
productsRouter.get('/products/popularSearch/get', getPopularSearch);
productsRouter.post('/products/popularSearch/add', addPopularSearch);

export default productsRouter;
