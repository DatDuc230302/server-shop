import express from 'express';
import {
    addProducts,
    getProducts,
    findName,
    findNameCate,
    findNameCateAndQuery,
    sortDate,
    sortDateCate,
    sortDateCateAndQuery,
    sortLowest,
    sortLowestCate,
    sortLowestCateAndQuery,
    sortHighest,
    sortHighestCate,
    sortHighestCateAndQuery,
    sortBetweenPrice,
    sortBetweenPriceCate,
    sortBetweenPriceCateAndQuery,
    findId,
} from '../controllers/productsController.js';

const productsRouter = express.Router();

productsRouter.get('/products/get', getProducts);
productsRouter.post('/products/add', addProducts);
productsRouter.post('/products/findId', findId);
productsRouter.post('/products/findName', findName);
productsRouter.post('/products/findNameCate', findNameCate);
productsRouter.post('/products/findNameCateAndQuery', findNameCateAndQuery);
productsRouter.post('/products/sortDate', sortDate);
productsRouter.post('/products/sortDateCate', sortDateCate);
productsRouter.post('/products/sortDateCateAndQuery', sortDateCateAndQuery);
productsRouter.post('/products/sortLowest', sortLowest);
productsRouter.post('/products/sortLowestCate', sortLowestCate);
productsRouter.post('/products/sortLowestCateAndQuery', sortLowestCateAndQuery);
productsRouter.post('/products/sortHighest', sortHighest);
productsRouter.post('/products/sortHighestCate', sortHighestCate);
productsRouter.post('/products/sortHighestCateAndQuery', sortHighestCateAndQuery);
productsRouter.post('/products/sortBetweenPrice', sortBetweenPrice);
productsRouter.post('/products/sortBetweenPriceCate', sortBetweenPriceCate);
productsRouter.post('/products/sortBetweenPriceCateAndQuery', sortBetweenPriceCateAndQuery);

export default productsRouter;