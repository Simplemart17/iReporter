import Auth from '../services/auth.service';
import { generateToken, comparePassword } from '../middleware/Helper';

class Users {
  static async registerUser(req, res) {
    const { body } = req;
    try {
      const result = await Auth.createUser(body);
      delete result.password;

      return res.status(201).json({
        status: 201,
        message: 'You have successfully registered!',
        data: result,
      });
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        if (error.fields.email) {
          return res.status(409).json({
            status: 409,
            message: 'This Email Already Exist',
          });
        }

        if (error.fields.phonenumber) {
          return res.status(409).json({
            status: 409,
            message: 'This Username Already Exist',
          });
        }
      }
      return res.status(500).json({
        status: 500,
        message: 'Something Went Wrong',
      });
    }
  }

  static async signin(req, res) {
    const { email, password } = req.body;
    try {
      const user = await Auth.getUserByEmail(email);

      if (!user) {
        return res.status(404).json({
          status: 404,
          error: 'Incorrect email or password',
        });
      }

      if (!comparePassword(user.password, password)) {
        return res.status(404).json({
          status: 404,
          error: 'Incorrect email or password',
        });
      }

      delete user.password;
      const { id, isAdmin } = user;
      const token = await generateToken({ id, isAdmin, email });

      return res.status(200).json({
        message: 'You have successfully signed in!',
        token,
        data: user,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Something Went Wrong',
      });
    }
  }

  static async getUsers(req, res) {
    req.query.limit = req.query.limit >= process.env.MAX_LIMIT ? 20 : req.query.limit;
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    const { isAdmin } = req.user.decoded;
    try {
      const users = await Auth.getAllUsers(isAdmin, limit, page);

      return res.status(200).json({
        message: 'Users successfully retrieved!',
        data: users,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Something Went Wrong',
      });
    }
  }
}

export default Users;
