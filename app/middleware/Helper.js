import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const SECRET = process.env.SECRET;

  function generateHashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
  };

  // To compare registered and signin password
  function comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  };

  // Token generation
  function generateToken(id) {
    const token = jwt.sign({
      userId: id
    },
      SECRET, { expiresIn: '2d' }
    );
    return token;
  };

export {
  generateHashPassword,
  comparePassword,
  generateToken
};