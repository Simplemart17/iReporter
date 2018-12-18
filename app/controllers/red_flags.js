import dBase from '../models/query';

const RedFlags = {
  async createRedflag(req, res) {
    const text = `INSERT INTO
    records (title, createdBy, type, location, status, images, videos, comment)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8)
    returning *`;
    const values = [
      req.body.title,
      req.user.id,
      req.body.type,
      req.body.location,
      'Draft',
      req.body.images,
      req.body.videos,
      req.body.comment
    ];
    try {
      const { rows } = await dBase.query(text, values);
      return res.status(201).json({
        message: 'Redflag record created',
        records: rows[0] });
    } catch (error) {
      // console.log(error);
      return res.json(error);
    }
  },

  async getAllRedflags(req, res) {
    const findAllQuery = `SELECT * FROM records WHERE records.type = 'Redflag'`;
    try {
      const { rows, rowCount } = await dBase.query(findAllQuery);
      if (!rows[0]) {
        return res.status(404).json({
          message: 'No redflag record found'
        });
      }
      return res.status(200).json({
        message: 'Redflags records retrieved',
        records: rows,
        Total: rowCount });
    } catch (error) {
      // console.log(error);
      return res.json(error);
    }
  },

  async getRedflag(req, res) {
    const text = `SELECT * FROM records WHERE id = $1 AND type = 'Redflag'`;
    try {
      const { rows } = await dBase.query(text, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).json({ message: 'Redflag record not found' });
      }
      return res.status(200).json({
        message: 'Redflag record retrieved',
        records: rows[0] });
    } catch (error) {
      return res.json(error);
    }
  },

  async updateRedflagComment(req, res) {
    const findOneQuery = `SELECT * FROM records WHERE id = $1  AND type = 'Redflag'`;
    const updateOneQuery = `UPDATE records
    SET comment = $1
    WHERE id = $2`;
    try {
      const { rows } = await dBase.query(findOneQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).json({ message: 'Redflag record not found!' });
      }
      const values = [
        req.body.comment || rows[0].comment,
        req.params.id,
      ];
      const response = await dBase.query(updateOneQuery, values);
      return res.status(201).json({
        message: 'Redflag comment updated successfully!',
        records: response.rows[0] });
    } catch (error) {
      return res.json(error);
    }
  },

  async updateRedflagLocation(req, res) {
    const findOneQuery = `SELECT * FROM records WHERE id = $1 AND type = 'Redflag'`;
    const updateOneQuery = `UPDATE records
    SET location = $1
    WHERE id = $2`;
    try {
      const { rows } = await dBase.query(findOneQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).json({ message: 'Redflag record not found' });
      }
      const values = [
        req.body.location || rows[0].location,
        req.params.id,
      ];
      const response = await dBase.query(updateOneQuery, values);
      return res.status(201).json({
        message: 'Redflag location successfully updated!',
        records: response.rows[0] });
    } catch (error) {
      return res.json(error);
    }
  },

  async deleteRedflag(req, res) {
    const deleteQuery = 'DELETE FROM records WHERE id = $1 returning *';
    try {
      const { rows } = await dBase.query(deleteQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).json({ message: 'Redflag record not found' });
      }
      return res.status(200).json({ message: 'Redflag record deleted successfully' });
    } catch (error) {
      return res.json(error);
    }
  },
};

export default RedFlags;
