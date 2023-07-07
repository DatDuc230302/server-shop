import express from 'express';
import {
    addCarts,
    checkIdUser,
    deleteAllByIdProducts,
    getCarts,
    updateChangeProductsCarts,
    updateProductsCarts,
} from '../controllers/cartsController.js';
import { checkIdProduct } from '../controllers/productsController.js';

const cartsRouter = express.Router();

cartsRouter.post('/carts/addCarts', checkIdUser, addCarts);
cartsRouter.post('/carts/updateProductsCarts', updateProductsCarts);
cartsRouter.get('/carts/getCarts', checkIdUser, getCarts);
cartsRouter.post('/carts/deleteAllByIdProducts', checkIdProduct, deleteAllByIdProducts);
cartsRouter.post('/carts/updateChangeProductsCarts', updateChangeProductsCarts);

export default cartsRouter;
