import express from 'express';
import { addOrders, checkUserId, getOrders } from '../controllers/ordersController.js';

const ordersRouter = express.Router();

ordersRouter.get('/orders/getOrders', getOrders);
ordersRouter.post('/orders/addOrders', checkUserId, addOrders);

export default ordersRouter;
