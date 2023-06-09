import express from 'express';
import { addCarts, addUsers, findIdUsers, getUsers } from '../controllers/usersController.js';

const usersRouter = express.Router();

usersRouter.get('/users/get', getUsers);
usersRouter.post('/users/add', addUsers);
usersRouter.post('/users/findId', findIdUsers);
usersRouter.post('/users/addCarts', addCarts);

export default usersRouter;
