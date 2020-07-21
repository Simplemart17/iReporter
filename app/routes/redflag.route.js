import { Router } from 'express';
import redFlags from '../controllers/redflags.controller';
import Auth from '../middleware/Auth';
import validation from '../middleware/validation';

const route = Router();

route.post('/record/red-flags', Auth.verifyToken, validation.inputDetails, validation.inputLocation, validation.inputComment, redFlags.createRedflag);

route.get('/record/red-flags', redFlags.getAllRedflags);

route.get('/record/red-flags/:id', Auth.verifyToken, redFlags.getRedflag);

route.patch('/record/red-flags/:id/comment', Auth.verifyToken, validation.inputComment, redFlags.updateRedflagComment);

route.patch('/record/red-flags/:id/location', Auth.verifyToken, validation.inputLocation, redFlags.updateRedflagLocation);

route.delete('/record/red-flags/:id', Auth.verifyToken, redFlags.deleteRedflag);

export default route;
