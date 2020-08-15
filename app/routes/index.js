import { Router } from 'express';
import users from './users.route';
import records from './records.route';

const route = Router();

route.use('/auth', users);
route.use('/records', records);

export default route;
