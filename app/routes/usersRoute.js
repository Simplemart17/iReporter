import express from 'express';
import users from '../controllers/users';
import validation from '../middleware/validation';

const userRouter = express.Router();

userRouter.post('/auth/signup', validation.users, users.createUser);

userRouter.post('/auth/signin', validation.users, users.signin);

userRouter.get('/auth/users', users.getUsers);

export default userRouter;