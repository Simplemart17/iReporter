import { Op } from 'sequelize';
import models from '../database/models';

const { User, Record } = models;

export default class RecordServices {
  /**
   * @description - This method generate quryto create new user
   * @param {Object} payload
   * @param {integer} userId
   * @returns {Object} - Response object
   */
  static async createRecord(payload, userId) {
    const {
      title,
      type,
      location,
      imageUrl,
      videoUrl,
      comment,
    } = payload;

    try {
      const result = await Record.create({
        title, type, location, imageUrl, videoUrl, comment, createdBy: userId,
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
  * @description - This method get all the records in the table
  * @param {integer} userId
  * @param {string} type
  * @param {number} limit
  * @param {number} page
  * @returns {Array}
  */
  static async getRecordByType(userId, recordType, limit, page) {
    const offset = limit * (page - 1);
    try {
      const records = await Record.findAndCountAll({
        limit,
        offset,
        where: {
          [Op.and]: [{ createdBy: userId }, { type: recordType }],
        },
        include: [
          {
            model: User,
            attributes: ['fullname', 'username', 'email'],
          },
        ],
      });

      const { count, rows } = records;
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


  /**
   * @description - This method get all the records in the table
   * @param {integer} userId
   * @param {number} limit
   * @param {number} page
   * @returns {Array}
   */
  static async getRecordByUser(userId, limit, page) {
    const offset = limit * (page - 1);
    try {
      const records = await Record.findAndCountAll({
        limit,
        offset,
        where: {
          createdBy: {
            [Op.eq]: userId,
          },
        },
        include: [
          {
            model: User,
            attributes: ['fullname', 'username', 'email'],
          },
        ],
      });

      const { count, rows } = records;
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
