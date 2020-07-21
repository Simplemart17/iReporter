import express, { urlencoded, json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';

dotenv.config();
const app = express();

const port = (process.env.PORT || 5000);

// Initializing cors
app.use(cors());
// Setting body parsers
app.use(json());
app.use(urlencoded({ extended: false }));
// initialize routes
app.use('/api/v1', routes);
app.get('/api/v1', (req, res) => {
  res.json({ message: 'Welcome to IReporter' });
});

app.get('*', (req, res) => {
  res.status(404).json({ error: 'The page cannot be found!' });
});

app.listen(port, () => console.log(`Server started on port ${port}`));

export default app;
