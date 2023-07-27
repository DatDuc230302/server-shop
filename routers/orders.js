import express from 'express';
import { addOrders, checkUserId, getOrdered, getOrders, updateStatus } from '../controllers/ordersController.js';

const ordersRouter = express.Router();

ordersRouter.get('/orders/getOrders', getOrders);
ordersRouter.get('/orders/getOrdered', getOrdered);
ordersRouter.post('/orders/addOrders', checkUserId, addOrders);
ordersRouter.post('/orders/updateStatus', updateStatus);

export default ordersRouter;
