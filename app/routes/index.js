import { Router } from 'express';
import users from './users.route';
import redFlags from './redflag.route';
import interventions from './intervention.route';

const route = Router();

route.use('/auth', users);
route.use('/', redFlags);
route.use('/', interventions);

export default route;
