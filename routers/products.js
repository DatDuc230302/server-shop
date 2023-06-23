import express from 'express';
import {
    addProducts,
    getProducts,
    //
    queryName,
    queryCate,
    queryNameCate,
    //
    sortDateName,
    sortDateCate,
    sortDateNameCate,
    //
    sortLowestName,
    sortLowestCate,
    sortLowestNameCate,
    //
    sortHighestName,
    sortHighestCate,
    sortHighestNameCate,
    //
    sortBetweenPriceName,
    sortBetweenPriceCate,
    sortBetweenPriceNameCate,
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
    searchName,
} from '../controllers/productsController.js';

const productsRouter = express.Router();

productsRouter.post('/products/add', addProducts);
productsRouter.get('/products/get', getProducts);
//
productsRouter.get('/products/queryName', queryName);
productsRouter.get('/products/queryCate', queryCate);
productsRouter.get('/products/queryNameCate', queryNameCate);
//Search Name
productsRouter.get('/products/searchName', searchName);
//
productsRouter.get('/products/queryId', queryId);
productsRouter.post('/products/findAllById', findAllById);
//
productsRouter.get('/products/sortDateName', sortDateName);
productsRouter.get('/products/sortDateCate', sortDateCate);
productsRouter.get('/products/sortDateNameCate', sortDateNameCate);
//
productsRouter.get('/products/sortLowestName', sortLowestName);
productsRouter.get('/products/sortLowestCate', sortLowestCate);
productsRouter.get('/products/sortLowestNameCate', sortLowestNameCate);
//
productsRouter.get('/products/sortHighestName', sortHighestName);
productsRouter.get('/products/sortHighestCate', sortHighestCate);
productsRouter.get('/products/sortHighestNameCate', sortHighestNameCate);
//
productsRouter.get('/products/sortBetweenPriceName', sortBetweenPriceName);
productsRouter.get('/products/sortBetweenPriceCate', sortBetweenPriceCate);
productsRouter.get('/products/sortBetweenPriceNameCate', sortBetweenPriceNameCate);
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
