import jwt from 'jsonwebtoken';
import dBase from '../models/query';
import dotenv from 'dotenv';

dotenv.config();
const SECRET = process.env.SECRET;

const Auth = {
  async verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(400).json({ error: 'Token is not provided' });
    }
    try {
      const decoded = await jwt.verify(token, SECRET);
      const text = 'SELECT * FROM users WHERE id = $1';
      const { rows } = await dBase.query(text, [decoded.userId]);
      if (!rows[0]) {
        return res.status(400).json({ error: 'The token you provided is invalid' });
      }
      req.user = { id: decoded.userId };
      next();
    }
    catch (error) {
      return res.status(400).json(error);
    }
  },
};

export default Auth;
