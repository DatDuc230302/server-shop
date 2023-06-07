import express from 'express';
import { addUsers, findIdUsers, getUsers } from '../controllers/usersController.js';

const usersRouter = express.Router();

usersRouter.get('/users/get', getUsers);
usersRouter.post('/users/add', addUsers);
usersRouter.post('/users/findId', findIdUsers);

export default usersRouter;
