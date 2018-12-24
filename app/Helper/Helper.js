import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const SECRET = process.env.SECRET;

class Helper {
    static hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
  };

  // To compare registered and signin password
  static comparePassword(hashPassword, password){
    return bcrypt.compareSync(password, hashPassword);
  };

  // Token generation
  static generateToken(id) {
    const token = jwt.sign({
      userId: id
    },
      SECRET, { expiresIn: '2d' }
    );
    return token;
  };
}



export default Helper;