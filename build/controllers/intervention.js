'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _query = require('../models/query');

var _query2 = _interopRequireDefault(_query);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Intervention = {
  createIntervention: async function createIntervention(req, res) {
    var text = 'INSERT INTO\n    records (id, title, createdBy, type, location, status, Images, Videos, comment)\n    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)\n    returning *';
    var values = [(0, _v2.default)(), req.body.title, req.body.createdBy, req.body.type, req.body.location, req.body.status, req.body.Images, req.body.Videos, req.body.comment];
    try {
      var _ref = await _query2.default.query(text, values),
          rows = _ref.rows;

      return res.status(201).send({
        status: 201,
        message: 'Intervention record created',
        records: rows[0] });
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },
  getAllIntervention: async function getAllIntervention(req, res) {
    var findAllQuery = 'SELECT * FROM records WHERE records.type = \'Intervention\'';
    try {
      var _ref2 = await _query2.default.query(findAllQuery),
          rows = _ref2.rows,
          rowCount = _ref2.rowCount;

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
  getIntervention: async function getIntervention(req, res) {
    var text = 'SELECT * FROM records WHERE id = $1';
    try {
      var _ref3 = await _query2.default.query(text, [req.params.id]),
          rows = _ref3.rows;

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
  updateInterventionComment: async function updateInterventionComment(req, res) {
    var findOneQuery = 'SELECT * FROM records WHERE id = $1';
    var updateOneQuery = 'UPDATE records\n    SET comment = $1\n    WHERE id = $2 returning *';
    try {
      var _ref4 = await _query2.default.query(findOneQuery, [req.params.id]),
          rows = _ref4.rows;

      if (!rows[0]) {
        return res.status(404).send({ message: 'Intervention record not found' });
      }
      var values = [req.body.comment || rows[0].comment, req.params.id];
      var response = await _query2.default.query(updateOneQuery, values);
      return res.status(200).send({
        status: 200,
        message: 'Intervention comment updated successfully!',
        records: response.rows[0] });
    } catch (error) {
      return res.send(error);
    }
  },
  updateInterventionLocation: async function updateInterventionLocation(req, res) {
    var findOneQuery = 'SELECT * FROM records WHERE id = $1';
    var updateOneQuery = 'UPDATE records\n    SET location = $1\n    WHERE id = $2 returning *';
    try {
      var _ref5 = await _query2.default.query(findOneQuery, [req.params.id]),
          rows = _ref5.rows;

      if (!rows[0]) {
        return res.status(404).send({ message: 'Intervention record not found' });
      }
      var values = [req.body.location || rows[0].location, req.params.id];
      var response = await _query2.default.query(updateOneQuery, values);
      return res.status(200).send({
        status: 201,
        message: 'Intervention location successfully updated!',
        records: response.rows[0] });
    } catch (error) {
      return res.send(error);
    }
  },
  deleteIntervention: async function deleteIntervention(req, res) {
    var deleteQuery = 'DELETE FROM records WHERE id = $1 returning *';
    try {
      var _ref6 = await _query2.default.query(deleteQuery, [req.params.id]),
          rows = _ref6.rows;

      if (!rows[0]) {
        return res.status(404).send({ message: 'Intervention record not found' });
      }
      return res.status(200).send({ message: 'Intervention record deleted successfully' });
    } catch (error) {
      return res.send(error);
    }
  }
};

exports.default = Intervention;
//# sourceMappingURL=intervention.js.map