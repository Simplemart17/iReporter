import express from 'express';
import redFlags from '../controllers/red_flags';
import Auth from '../middleware/Auth';
import validation from '../middleware/validation';

const redRouter = express.Router();

redRouter.post('/red-flags', Auth.verifyToken, validation.inputDetails, validation.inputLocation, validation.inputComment, redFlags.createRedflag);

redRouter.get('/red-flags', redFlags.getAllRedflags);

redRouter.get('/red-flags/:id', Auth.verifyToken, redFlags.getRedflag);

redRouter.patch('/red-flags/:id/comment', Auth.verifyToken, validation.inputComment, redFlags.updateRedflagComment);

redRouter.patch('/red-flags/:id/location', Auth.verifyToken, validation.inputLocation, redFlags.updateRedflagLocation);

redRouter.delete('/red-flags/:id', Auth.verifyToken, redFlags.deleteRedflag);

export default redRouter;
