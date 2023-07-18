import express from 'express';
import {
    addCarts,
    checkIdUser,
    deleteAllByIdProducts,
    deleteCart,
    getCarts,
    updateChangeProductsCarts,
    updateProductsCarts,
} from '../controllers/cartsController.js';
import { checkIdProduct } from '../controllers/productsController.js';

const cartsRouter = express.Router();

cartsRouter.post('/carts/addCarts', addCarts);
cartsRouter.post('/carts/updateProductsCarts', updateProductsCarts);
cartsRouter.get('/carts/getCarts', checkIdUser, getCarts);
cartsRouter.post('/carts/deleteAllByIdProducts', checkIdProduct, deleteAllByIdProducts);
cartsRouter.post('/carts/updateChangeProductsCarts', updateChangeProductsCarts);
cartsRouter.post('/carts/deleteCart', deleteCart);

export default cartsRouter;
