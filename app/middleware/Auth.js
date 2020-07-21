import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class Auth {
  /**
   * @description - Checks if user token is valid
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {*} - returns next() or response object when there is an error
   */
  static async verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];

    if (!token) {
      return res.status(401).json({
        status: 401,
        error: 'You have to sign in to continue',
      });
    }

    try {
      const decoded = await jwt.verify(token, process.env.SECRET);
      req.user = { token, decoded };
    } catch (error) {
      const message = (error.name === 'TokenExpiredError') ? 'Token has expired' : 'Invalid token';

      return res.status(401).json({
        status: 401,
        error: message,
      });
    }
    return next();
  }

  /**
 * @description - Checks if user is an admin
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {*} - returns next() or response object when there is an error
 */
  static async checkIsAdmin(req, res, next) {
    const { decoded: { isAdmin } } = req.user;

    if (!isAdmin) {
      return res.status(403).json({
        status: 403,
        error: 'You cannot access this route!',
      });
    }
    return next();
  }
}

export default Auth;
