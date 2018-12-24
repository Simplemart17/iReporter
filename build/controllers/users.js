'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _query = require('../models/query');

var _query2 = _interopRequireDefault(_query);

var _Helper = require('../Helper/Helper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Users = {
  createUser: async function createUser(req, res) {
    var hashPassword = (0, _Helper.generateHashPassword)(req.body.password);

    var createQuery = 'INSERT INTO users(firstname, lastname, othername, email, phoneNumber, username, password, isAdmin)\n    VALUES($1, $2, $3, $4, $5, $6, $7, $8) returning *';
    var values = [req.body.firstname, req.body.lastname, req.body.othername, req.body.email, req.body.phoneNumber, req.body.username, hashPassword, req.body.isAdmin || 'false'];
    try {
      var _ref = await _query2.default.query(createQuery, values),
          rows = _ref.rows;

      var token = (0, _Helper.generateToken)(rows[0].id);
      return res.status(201).json({
        message: 'You have successfully registered!',
        token: token
      });
    } catch (error) {
      // console.log(error);
      if (error.constraint === 'users_email_key') {
        return res.status(400).json({ error: 'Email already exist!' });
      } else if (error.constraint === 'users_username_key') {
        return res.status(400).json({ error: 'Username already exist!' });
      }
      return res.json(error);
    }
  },
  signin: async function signin(req, res) {
    var text = 'SELECT * FROM users WHERE email = $1';
    try {
      var _ref2 = await _query2.default.query(text, [req.body.email]),
          rows = _ref2.rows;

      if (!rows[0]) {
        return res.status(400).json({ error: 'Incorrect email address' });
      }
      if (!(0, _Helper.comparePassword)(rows[0].password, req.body.password)) {
        return res.status(400).json({ error: 'Incorrect password' });
      }
      var token = (0, _Helper.generateToken)(rows[0].id);
      return res.status(200).json({
        message: 'You have successfully signed in!',
        token: token
      });
    } catch (error) {
      // console.log(error)
      return res.json(error);
    }
  },
  getUsers: async function getUsers(req, res) {
    var findAllUsers = 'SELECT * FROM users';
    try {
      var _ref3 = await _query2.default.query(findAllUsers),
          rows = _ref3.rows,
          rowCount = _ref3.rowCount;

      if (!rows[0]) {
        return res.status(404).json({
          error: 'No user found!'
        });
      }
      return res.status(200).json({
        message: 'Users list retrieved',
        records: rows,
        Total: rowCount });
    } catch (error) {
      // console.log(error);
      return res.json(error);
    }
  }
};

exports.default = Users;
//# sourceMappingURL=users.js.map