import express from 'express';
import intervention from '../controllers/intervention';

const intvRouter = express.Router();

intvRouter.post('/intervention', intervention.createIntervention);

intvRouter.get('/intervention', intervention.getAllIntervention);

intvRouter.get('/intervention/:id', intervention.getIntervention);

intvRouter.patch('/intervention/:id/comment', intervention.updateInterventionComment);

intvRouter.patch('/intervention/:id/location', intervention.updateInterventionLocation);

intvRouter.delete('/intervention/:id', intervention.deleteIntervention);

export default intvRouter;
