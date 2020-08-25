import { Router } from 'express';
import Users from '../controllers/users.controller';
import validation from '../middleware/validation';
import Auth from '../middleware/Auth';

const { registerUser, signin, getUsers } = Users;
const { verifyToken, checkIsAdmin } = Auth;

const route = Router();

route.post('/signup', validation.userSignUp, registerUser);

route.post('/signin', validation.userSignIn, signin);

route.get('/users', verifyToken, checkIsAdmin, getUsers);

export default route;
