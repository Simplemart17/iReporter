import { Op } from 'sequelize';
import models from '../database/models';

const { User } = models;

export default class AuthServices {
  /**
   * @description - This method generate quryto create new user
   * @param {Object} payload
   * @returns {Object} - Response object
   */
  static async createUser(payload) {
    const {
      fullname,
      email,
      phonenumber,
      username,
      password,
    } = payload;

    try {
      const { dataValues } = await User.create({
        fullname, email, phonenumber, username, password,
      });
      return dataValues;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description - This method get a single user by email
   * @param {string} email
   *
   * @returns {Object} - User object
   */
  static getUserByEmail(email) {
    return User.findOne({
      where: {
        email,
      },
      raw: true,
    });
  }

  /**
   * @description -  This method get all the users in the system
   * @param {boolean} admin
   * @param {integer} limit
   * @param {number} page
   *
   * @returns {Array}
   */
  static async getAllUsers(admin, limit, page) {
    const offset = limit * (page - 1);
    try {
      const users = await User.findAndCountAll({
        limit,
        offset,
        where: {
          isAdmin: {
            [Op.ne]: admin,
          },
        },
        attributes: { exclude: ['password'] },
        raw: true,
      });
      const { count, rows } = users;
      const pages = Math.ceil(count / limit);
      const currentPage = Math.floor(offset / limit) + 1;
      const nextPage = currentPage === pages ? null : currentPage + 1;
      const prevPage = currentPage === 1 ? null : currentPage - 1;

      return {
        rows,
        meta: {
          limit,
          pages,
          currentPage,
          nextPage,
          prevPage,
        },
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  }
}
