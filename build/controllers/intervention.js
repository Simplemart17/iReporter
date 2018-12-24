'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _query = require('../models/query');

var _query2 = _interopRequireDefault(_query);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Intervention = {
  createIntervention: async function createIntervention(req, res) {
    var text = 'INSERT INTO\n    records (title, createdBy, type, location, status, images, videos, comment)\n    VALUES($1, $2, $3, $4, $5, $6, $7, $8)\n    returning *';
    var values = [req.body.title, req.user.id, req.body.type, req.body.location, 'Draft', req.body.images, req.body.videos, req.body.comment];
    try {
      if (req.body.type !== 'Intervention') {
        return res.status(400).json({ error: 'Select a valid record type' });
      }

      var _ref = await _query2.default.query(text, values),
          rows = _ref.rows;

      return res.status(201).json({
        message: 'Intervention record created',
        records: rows[0] });
    } catch (error) {
      // console.log(error);
      return res.json(error);
    }
  },
  getAllIntervention: async function getAllIntervention(req, res) {
    var findAllQuery = 'SELECT * FROM records WHERE records.type = \'Intervention\' AND createdBy = $1';
    try {
      var _ref2 = await _query2.default.query(findAllQuery, [req.user.id]),
          rows = _ref2.rows,
          rowCount = _ref2.rowCount;

      if (!rows[0]) {
        return res.status(404).json({
          message: 'No intervention record found'
        });
      }
      return res.status(200).json({
        message: 'Intervention records retrieved',
        records: rows,
        Total: rowCount });
    } catch (error) {
      // console.log(error);
      return res.json(error);
    }
  },
  getIntervention: async function getIntervention(req, res) {
    var text = 'SELECT * FROM records WHERE id = $1, createdBy = $2 AND type = \'Intervention\'';
    try {
      var _ref3 = await _query2.default.query(text, [req.params.id, req.user.id]),
          rows = _ref3.rows;

      if (!rows[0]) {
        return res.status(404).json({ message: 'Intervention record not found' });
      }
      return res.status(200).json({
        message: 'Intervention record retrieved',
        records: rows[0] });
    } catch (error) {
      return res.json(error);
    }
  },
  updateInterventionComment: async function updateInterventionComment(req, res) {
    var findOneQuery = 'SELECT * FROM records WHERE id = $1, createdBy = $2 AND type = \'Intervention\'';
    var updateOneQuery = 'UPDATE records\n    SET comment = $1\n    WHERE id = $2 AND createdBy = $3 returning *';
    try {
      var _ref4 = await _query2.default.query(findOneQuery, [req.params.id, req.user.id]),
          rows = _ref4.rows;

      if (!rows[0]) {
        return res.status(404).json({ message: 'Intervention record not found!' });
      }
      var values = [req.body.comment || rows[0].comment, req.params.id, req.user.id];
      var response = await _query2.default.query(updateOneQuery, values);
      return res.status(201).json({
        message: 'Intervention comment updated successfully!',
        records: response.rows[0] });
    } catch (error) {
      return res.json(error);
    }
  },
  updateInterventionLocation: async function updateInterventionLocation(req, res) {
    var findOneQuery = 'SELECT * FROM records WHERE id = $1, createdBy = $2 AND type = \'Intervention\'';
    var updateOneQuery = 'UPDATE records\n    SET location = $1\n    WHERE id = $2 AND createdBy = $2 returning *';
    try {
      var _ref5 = await _query2.default.query(findOneQuery, [req.params.id], req.user.id),
          rows = _ref5.rows;

      if (!rows[0]) {
        return res.status(404).json({ message: 'Intervention record not found' });
      }
      var values = [req.body.location || rows[0].location, req.params.id, req.user.id];
      var response = await _query2.default.query(updateOneQuery, values);
      return res.status(201).json({
        message: 'Intervention location successfully updated!',
        records: response.rows[0] });
    } catch (error) {
      return res.json(error);
    }
  },
  deleteIntervention: async function deleteIntervention(req, res) {
    var deleteQuery = 'DELETE FROM records WHERE id = $1 AND createdBy = $2 returning *';
    try {
      var _ref6 = await _query2.default.query(deleteQuery, [req.params.id, req.user.id]),
          rows = _ref6.rows;

      if (!rows[0]) {
        return res.status(404).json({ message: 'Intervention record not found' });
      }
      return res.status(200).json({ message: 'Intervention record deleted successfully' });
    } catch (error) {
      return res.json(error);
    }
  }
};

exports.default = Intervention;
//# sourceMappingURL=intervention.js.map