import express from 'express';
import { addCarts, addUsers, deleteCarts, findIdUsers, getUsers, updateCarts } from '../controllers/usersController.js';

const usersRouter = express.Router();

usersRouter.get('/users/get', getUsers);
usersRouter.post('/users/add', addUsers);
usersRouter.post('/users/findId', findIdUsers);
usersRouter.post('/users/addCarts', addCarts);
usersRouter.post('/users/updateCarts', updateCarts);
usersRouter.post('/users/deleteCarts', deleteCarts);

export default usersRouter;
