import express from 'express';
import intervention from '../controllers/intervention';
import Auth from '../middleware/Auth';
import validation from '../middleware/validation';

const intvRouter = express.Router();

intvRouter.post('/intervention', Auth.verifyToken, validation.inputDetails, validation.inputComment, validation.inputLocation, intervention.createIntervention);

intvRouter.get('/intervention', intervention.getAllIntervention);

intvRouter.get('/intervention/:id', Auth.verifyToken, intervention.getIntervention);

intvRouter.patch('/intervention/:id/comment', Auth.verifyToken, validation.inputComment, intervention.updateInterventionComment);

intvRouter.patch('/intervention/:id/location', Auth.verifyToken, validation.inputLocation, intervention.updateInterventionLocation);

intvRouter.delete('/intervention/:id', Auth.verifyToken, intervention.deleteIntervention);

export default intvRouter;
