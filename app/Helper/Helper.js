import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const SECRET = process.env.SECRET;

const Helper = {
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  },

  // To compare registered and signin password
  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },

  // To validate email
  isValidEmail(email) {
    return /\S+@\S+\.\S/.test(email);
  },

  // Token generation
  generateToken(id) {
    const token = jwt.sign({
      userId: id
    },
      SECRET, { expiresIn: '2d' }
    );
    return token;
  }
}

export default Helper;