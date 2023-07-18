import express from 'express';
import { addOrders, checkUserId, getOrders, updateStatus } from '../controllers/ordersController.js';

const ordersRouter = express.Router();

ordersRouter.get('/orders/getOrders', getOrders);
ordersRouter.post('/orders/addOrders', checkUserId, addOrders);
ordersRouter.post('/orders/updateStatus', updateStatus);

export default ordersRouter;
