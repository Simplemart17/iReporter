import { Op } from 'sequelize';
import models from '../database/models';

const { User } = models;

export default class Auth {
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

  static getUserByEmail(email) {
    return User.findOne({
      where: {
        email,
      },
      raw: true,
    });
  }

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
        raw: true,
      });
      const { count, rows } = users;
      const pages = Math.ceil(count / limit);
      const currentPage = Math.floor(offset / limit) + 1;
      const nextPage = currentPage === pages ? null : currentPage + 1;
      const prevPage = currentPage === 1 ? null : currentPage - 1;

      return {
        success: true,
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
