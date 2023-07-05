import express from 'express';
import { addUsers, queryId, getAvatars, getUsers, updateAvatar, checkAdmin } from '../controllers/usersController.js';

const usersRouter = express.Router();

usersRouter.get('/users/get', getUsers);
usersRouter.post('/users/add', addUsers);
usersRouter.get('/users/queryId', queryId);
usersRouter.post('/users/updateAvatar', updateAvatar);

usersRouter.get('/users/checkAdmin', checkAdmin);

//

usersRouter.get('/users/getAvatars', getAvatars);
export default usersRouter;
