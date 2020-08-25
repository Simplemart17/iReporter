import AuthServices from '../services/auth.services';
import { generateToken, comparePassword } from '../middleware/Helper';

class Users {
  /**
   * @description - This method regster new user
   * @param {Object} request
   * @param {Object} response
   * @returns {Object} - Response object
   */
  static async registerUser(req, res) {
    const { body } = req;
    try {
      const result = await AuthServices.createUser(body);
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

  /**
 * @description - This method log a user in
 * @param {Object} request
 * @param {Object} response
 * @returns {Object} - Response object
 */
  static async signin(req, res) {
    const { email, password } = req.body;
    try {
      const user = await AuthServices.getUserByEmail(email);

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
        status: 200,
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

  /**
 * @description - This method get all the users in the system
 * @param {Object} request
 * @param {Object} response
 * @returns {Array} - Response object
 */
  static async getUsers(req, res) {
    req.query.limit = req.query.limit >= process.env.MAX_LIMIT ? 20 : req.query.limit;
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    const { isAdmin } = req.user.decoded;
    try {
      const { rows, meta } = await AuthServices.getAllUsers(isAdmin, limit, page);

      return res.status(200).json({
        status: 200,
        message: 'Users successfully retrieved!',
        data: rows,
        meta,
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
