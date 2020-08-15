import RecordServices from '../services/record.services';

class Records {
  /**
   * @description - Create a new record
   * @param {Object} req
   * @param {Object} res
   *
   * @returns {Object} - Response object from the database
   */
  static async createNewRecord(req, res) {
    const { body } = req;

    // get the logged in user id
    const { decoded: { id } } = req.user;

    try {
      const result = await RecordServices.createRecord(body, id);

      return res.status(201).json({
        status: 201,
        message: 'Record successfully created',
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Something Went Wrong',
      });
    }
  }

  /**
 * @description - Get all records
 * @param {Object} req
 * @param {Object} res
 *
 * @returns {Object} - Response object from the database
 */
  static async getAllRecordByUser(req, res) {
    req.query.limit = req.query.limit >= process.env.MAX_LIMIT ? 20 : req.query.limit;
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;

    // get the logged in user id
    const { decoded: { id } } = req.user;

    try {
      const { rows, meta } = await RecordServices.getRecordByUser(id, limit, page);

      return res.status(200).json({
        status: 200,
        message: 'Record successfully retrieved',
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

  /**
* @description - Get all records by type
* @param {Object} req
* @param {Object} res
* @param {Function} next
* @returns {Object} - Response object from the database
*/
  static async getAllRecordByType(req, res, next) {
    req.query.limit = req.query.limit >= process.env.MAX_LIMIT ? 20 : req.query.limit;
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;

    // get the logged in user id
    const { decoded: { id } } = req.user;

    if ('recordType' in req.query) {
      try {
        const { rows, meta } = await RecordServices.getRecordByType(
          id, req.query.recordType, limit, page,
        );

        return res.status(200).json({
          status: 200,
          message: 'Record successfully retrieved',
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
    return next();
  }
}

export default Records;
