import express from 'express';
import {
    addCarts,
    addUsers,
    deleteCarts,
    queryId,
    getAvatars,
    getUsers,
    updateAvatar,
    updateCarts,
    checkAdmin,
} from '../controllers/usersController.js';

const usersRouter = express.Router();

usersRouter.get('/users/get', getUsers);
usersRouter.post('/users/add', addUsers);
usersRouter.get('/users/queryId', queryId);
usersRouter.post('/users/addCarts', addCarts);
usersRouter.post('/users/updateCarts', updateCarts);
usersRouter.post('/users/deleteCarts', deleteCarts);
usersRouter.post('/users/updateAvatar', updateAvatar);

usersRouter.get('/users/checkAdmin', checkAdmin);

//

usersRouter.get('/users/getAvatars', getAvatars);
export default usersRouter;
