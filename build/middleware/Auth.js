'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _query = require('../models/query');

var _query2 = _interopRequireDefault(_query);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();
var SECRET = process.env.SECRET;

var Auth = {
  verifyToken: async function verifyToken(req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token) {
      return res.status(400).json({ error: 'Token is not provided' });
    }
    try {
      var decoded = await _jsonwebtoken2.default.verify(token, SECRET);
      var text = 'SELECT * FROM users WHERE id = $1';

      var _ref = await _query2.default.query(text, [decoded.userId]),
          rows = _ref.rows;

      if (!rows[0]) {
        return res.status(400).json({ error: 'The token you provided is invalid' });
      }
      req.user = { id: decoded.userId };
      next();
    } catch (error) {
      return res.status(400).json(error);
    }
  }
};

exports.default = Auth;
//# sourceMappingURL=Auth.js.map