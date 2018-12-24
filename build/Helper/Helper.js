'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateToken = exports.comparePassword = exports.generateHashPassword = undefined;

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();
var SECRET = process.env.SECRET;

function generateHashPassword(password) {
  return _bcrypt2.default.hashSync(password, _bcrypt2.default.genSaltSync(8));
};

// To compare registered and signin password
function comparePassword(hashPassword, password) {
  return _bcrypt2.default.compareSync(password, hashPassword);
};

// Token generation
function generateToken(id) {
  var token = _jsonwebtoken2.default.sign({
    userId: id
  }, SECRET, { expiresIn: '2d' });
  return token;
};

exports.generateHashPassword = generateHashPassword;
exports.comparePassword = comparePassword;
exports.generateToken = generateToken;
//# sourceMappingURL=Helper.js.map