import express from 'express';
import {
    addProducts,
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
    findAndUpdateViews,
    querySoldCate,
    queryNote,

    // PopularSearch
    getPopularSearch,
    addPopularSearch,
} from '../controllers/productsController.js';

const productsRouter = express.Router();

productsRouter.post('/products/add', addProducts);
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
productsRouter.post('/products/findAndUpdateViews', findAndUpdateViews);
productsRouter.get('/products/querySoldCate', querySoldCate);
productsRouter.get('/products/queryNote', queryNote);

// PopularSearches
productsRouter.get('/products/popularSearch/get', getPopularSearch);
productsRouter.post('/products/popularSearch/add', addPopularSearch);

export default productsRouter;
