import uuidv4 from 'uuid/v4';
import dBase from '../models/query';

const Intervention = {
  async createIntervention(req, res) {
    const text = `INSERT INTO
    records (id, title, createdBy, type, location, status, Images, Videos, comment)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
    returning *`;
    const values = [
      uuidv4(),
      req.body.title,
      req.body.createdBy,
      req.body.type,
      req.body.location,
      req.body.status,
      req.body.Images,
      req.body.Videos,
      req.body.comment,
    ];
    try {
      const { rows } = await dBase.query(text, values);
      return res.status(201).send({
        status: 201,
        message: 'Intervention record created',
        records: rows[0] });
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },

  async getAllIntervention(req, res) {
    const findAllQuery = `SELECT * FROM records WHERE records.type = 'Intervention'`;
    try {
      const { rows, rowCount } = await dBase.query(findAllQuery);
      return res.status(200).send({
        status: 200,
        message: 'Intervention records retrieved',
        records: rows,
        Total: rowCount });
    } catch (error) {
      // console.log(error);
      return res.send(error);
    }
  },

  async getIntervention(req, res) {
    const text = 'SELECT * FROM records WHERE id = $1';
    try {
      const { rows } = await dBase.query(text, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'Intervention record not found' });
      }
      return res.status(200).send({
        status: 200,
        message: 'Intervention record retrieved',
        records: rows[0] });
    } catch (error) {
      return res.send(error);
    }
  },

  async updateInterventionComment(req, res) {
    const findOneQuery = 'SELECT * FROM records WHERE id = $1';
    const updateOneQuery = `UPDATE records
    SET comment = $1
    WHERE id = $2 returning *`;
    try {
      const { rows } = await dBase.query(findOneQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'Intervention record not found' });
      }
      const values = [
        req.body.comment || rows[0].comment,
        req.params.id,
      ];
      const response = await dBase.query(updateOneQuery, values);
      return res.status(200).send({
        status: 200,
        message: 'Intervention comment updated successfully!',
        records: response.rows[0] });
    } catch (error) {
      return res.send(error);
    }
  },

  async updateInterventionLocation(req, res) {
    const findOneQuery = 'SELECT * FROM records WHERE id = $1';
    const updateOneQuery = `UPDATE records
    SET location = $1
    WHERE id = $2 returning *`;
    try {
      const { rows } = await dBase.query(findOneQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'Intervention record not found' });
      }
      const values = [
        req.body.location || rows[0].location,
        req.params.id,
      ];
      const response = await dBase.query(updateOneQuery, values);
      return res.status(200).send({
        status: 201,
        message: 'Intervention location successfully updated!',
        records: response.rows[0] });
    } catch (error) {
      return res.send(error);
    }
  },

  async deleteIntervention(req, res) {
    const deleteQuery = 'DELETE FROM records WHERE id = $1 returning *';
    try {
      const { rows } = await dBase.query(deleteQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'Intervention record not found' });
      }
      return res.status(200).send({ message: 'Intervention record deleted successfully' });
    } catch (error) {
      return res.send(error);
    }
  },
};

export default Intervention;
