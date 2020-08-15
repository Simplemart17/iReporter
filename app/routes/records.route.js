import { Router } from 'express';
import Records from '../controllers/records.controller';
// import validation from '../middleware/validation';
import Auth from '../middleware/Auth';

const { createNewRecord, getAllRecordByUser, getAllRecordByType } = Records;
const { verifyToken } = Auth;
// const { verifyToken, checkIsAdmin } = Auth;
// const { inputDetails, inputLocation, inputComment } = validation;

const route = Router();

route
  .post(
    '/',
    verifyToken,
    createNewRecord,
  )
  .get(
    '/',
    verifyToken,
    getAllRecordByType,
    getAllRecordByUser,
  );

export default route;
