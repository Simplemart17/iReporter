import express from 'express';
import redFlags from '../controllers/red_flags';
import Auth from '../middleware/Auth';

const redRouter = express.Router();

redRouter.post('/red-flags', Auth.verifyToken, redFlags.createRedflag);

redRouter.get('/red-flags', redFlags.getAllRedflags);

redRouter.get('/red-flags/:id', Auth.verifyToken, redFlags.getRedflag);

redRouter.patch('/red-flags/:id/comment', Auth.verifyToken, redFlags.updateRedflagComment);

redRouter.patch('/red-flags/:id/location', Auth.verifyToken, redFlags.updateRedflagLocation);

redRouter.delete('/red-flags/:id', Auth.verifyToken, redFlags.deleteRedflag);

export default redRouter;
