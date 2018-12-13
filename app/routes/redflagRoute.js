import express from 'express';
import redFlags from '../controllers/red_flags';

const redRouter = express.Router();

redRouter.post('/red-flags', redFlags.createRedflag);

redRouter.get('/red-flags', redFlags.getAllRedflags);

redRouter.get('/red-flags/:id', redFlags.getRedflag);

redRouter.patch('/red-flags/:id/comment', redFlags.updateRedflagComment);

redRouter.patch('/red-flags/:id/location', redFlags.updateRedflagLocation);

redRouter.delete('/red-flags/:id', redFlags.deleteRedflag);



export default redRouter;
