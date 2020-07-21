import { Router } from 'express';
import intervention from '../controllers/interventions.controller';
import Auth from '../middleware/Auth';
import validation from '../middleware/validation';

const route = Router();

route.post('/record/intervention', Auth.verifyToken, validation.inputDetails, validation.inputComment, validation.inputLocation, intervention.createIntervention);

route.get('/record/intervention', intervention.getAllIntervention);

route.get('/record/intervention/:id', Auth.verifyToken, intervention.getIntervention);

route.patch('/record/intervention/:id/comment', Auth.verifyToken, validation.inputComment, intervention.updateInterventionComment);

route.patch('/record/intervention/:id/location', Auth.verifyToken, validation.inputLocation, intervention.updateInterventionLocation);

route.delete('/record/intervention/:id', Auth.verifyToken, intervention.deleteIntervention);

export default route;
