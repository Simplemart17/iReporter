import express from 'express';
import intervention from '../controllers/intervention';
import Auth from '../middleware/Auth';

const intvRouter = express.Router();

intvRouter.post('/intervention', Auth.verifyToken, intervention.createIntervention);

intvRouter.get('/intervention', intervention.getAllIntervention);

intvRouter.get('/intervention/:id', Auth.verifyToken, intervention.getIntervention);

intvRouter.patch('/intervention/:id/comment', Auth.verifyToken, intervention.updateInterventionComment);

intvRouter.patch('/intervention/:id/location', Auth.verifyToken, intervention.updateInterventionLocation);

intvRouter.delete('/intervention/:id', Auth.verifyToken, intervention.deleteIntervention);

export default intvRouter;
