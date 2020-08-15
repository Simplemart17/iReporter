import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const expiryTime = { expiresIn: String(process.env.SIGNIN_TOKEN_EXPIRES) };


// To compare stored and signin password
const comparePassword = (hashPassword, password) => bcrypt.compareSync(password, hashPassword);

// Token generation
const generateToken = (user, expires = expiryTime) => jwt.sign(user, process.env.SECRET, expires);

export {
  comparePassword,
  generateToken,
};
