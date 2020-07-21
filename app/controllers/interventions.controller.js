import dBase from '../models/query';

const Intervention = {
  async createIntervention(req, res) {
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
      req.body.comment,
    ];
    try {
      if (req.body.type !== 'Intervention') {
        return res.status(400).json({ error: 'Select a valid record type' });
      }
      const { rows } = await dBase.query(text, values);
      return res.status(201).json({
        message: 'Intervention record created',
        records: rows[0],
      });
    } catch (error) {
      return res.json(error);
    }
  },

  async getAllIntervention(req, res) {
    const findAllQuery = 'SELECT * FROM records WHERE records.type = \'Intervention\'';
    try {
      const { rows, rowCount } = await dBase.query(findAllQuery);
      if (!rows[0]) {
        return res.status(404).json({
          message: 'No intervention record found',
        });
      }
      return res.status(200).json({
        message: 'Intervention records retrieved',
        records: rows,
        Total: rowCount,
      });
    } catch (error) {
      return res.json(error);
    }
  },

  async getIntervention(req, res) {
    const text = 'SELECT * FROM records WHERE id = $1 AND type = \'Intervention\'';
    try {
      const { rows } = await dBase.query(text, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).json({ message: 'Intervention record not found' });
      }
      return res.status(200).json({
        message: 'Intervention record retrieved',
        records: rows[0],
      });
    } catch (error) {
      console.log(error);
      return res.json(error);
    }
  },

  async updateInterventionComment(req, res) {
    const findOneQuery = 'SELECT * FROM records WHERE id = $1 AND type = \'Intervention\'';
    const updateOneQuery = `UPDATE records
    SET comment = $1
    WHERE id = $2`;
    try {
      const { rows } = await dBase.query(findOneQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).json({ message: 'Intervention record not found!' });
      }
      const values = [
        req.body.comment || rows[0].comment,
        req.params.id,
      ];
      const response = await dBase.query(updateOneQuery, values);
      return res.status(201).json({
        message: 'Intervention comment updated successfully!',
        records: response.rows[0],
      });
    } catch (error) {
      return res.json(error);
    }
  },

  async updateInterventionLocation(req, res) {
    const findOneQuery = 'SELECT * FROM records WHERE id = $1 AND type = \'Intervention\'';
    const updateOneQuery = `UPDATE records
    SET location = $1
    WHERE id = $2`;
    try {
      const { rows } = await dBase.query(findOneQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).json({ message: 'Intervention record not found' });
      }
      const values = [
        req.body.location || rows[0].location,
        req.params.id,
      ];
      const response = await dBase.query(updateOneQuery, values);
      return res.status(201).json({
        message: 'Intervention location successfully updated!',
        records: response.rows[0],
      });
    } catch (error) {
      return res.json(error);
    }
  },

  async deleteIntervention(req, res) {
    const deleteQuery = 'DELETE FROM records WHERE id = $1 returning *';
    try {
      const { rows } = await dBase.query(deleteQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).json({ message: 'Intervention record not found' });
      }
      return res.status(200).json({ message: 'Intervention record deleted successfully' });
    } catch (error) {
      return res.json(error);
    }
  },
};

export default Intervention;
