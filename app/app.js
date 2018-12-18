import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import redRouter from './routes/redflagRoute';
import intvRouter from './routes/interventionRoute';
import userRouter from './routes/usersRoute';

dotenv.config();
const app = express();

const port = (process.env.PORT || 5000);

app.set('appVersion', '/api/v1/record');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(app.get('appVersion'), redRouter);
app.use(app.get('appVersion'), intvRouter);
app.use('/api/v1', userRouter);
app.get('*', (req, res) => {
  res.status(404).json({ error: 'The page cannot be found!' });
});


app.listen(port, () => console.log(`Server started on port ${port}`));


export default app;
