'use strict';

var _pg = require('pg');

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var pool = new _pg.Pool({
  connectionString: process.env.DATABASE_URL
});
// console.log(process.env.DATABASE_URL);

pool.on('connect', function () {
  // console.log('connected to database');
});
pool.connect();

var dropRecordsTable = function dropRecordsTable() {
  var queryText = 'DROP TABLE records';
  pool.query(queryText).then(function (res) {
    // console.log(res);
  }).catch(function (err) {
    // console.log(err);
  });
};

var dropUsersTable = function dropUsersTable() {
  var queryText = 'DROP TABLE users';
  pool.query(queryText).then(function (res) {
    // console.log(res);
    pool.end();
  }).catch(function (err) {
    // console.log(err);
    pool.end();
  });
};

// Drop All Tables
var dropAllTables = function dropAllTables() {
  dropRecordsTable();
  dropUsersTable();
};

pool.on('remove', function () {
  console.log('client removed');
  process.exit(0);
});

dropAllTables();

require('make-runnable');
//# sourceMappingURL=dropTable.js.map