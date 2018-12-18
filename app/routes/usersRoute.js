import express from 'express';
import users from '../controllers/users';

const userRouter = express.Router();

userRouter.post('/auth/signup', users.createUser);

userRouter.post('/auth/signin', users.signin);

userRouter.get('/auth/users', users.getUsers);

export default userRouter;