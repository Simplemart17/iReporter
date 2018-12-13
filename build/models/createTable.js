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
  console.log('connected to database');
});
pool.connect();

// Table for records
var createRecordsTable = function createRecordsTable() {
  var queryText = 'CREATE TABLE IF NOT EXISTS\n  records(\n    id UUID PRIMARY KEY,\n    title VARCHAR(128) NOT NULL,\n    createdBy VARCHAR(128) NOT NULL,\n    type VARCHAR(128) NOT NULL,\n    location VARCHAR(128) NOT NULL,\n    status VARCHAR(128) NOT NULL,\n    Images TEXT,\n    Videos TEXT,\n    comment VARCHAR(128) NOT NULL\n);';

  pool.query(queryText).then(function (res) {
    console.log(res);
  }).catch(function (err) {
    console.log(err);
  });
};

// Create Users Table
var createUserTable = function createUserTable() {
  var queryText = 'CREATE TABLE IF NOT EXISTS\n  users(\n    id UUID PRIMARY KEY,\n    email VARCHAR(128) UNIQUE NOT NULL,\n    password VARCHAR(128) NOT NULL,\n    firstaname VARCHAR(128) NOT NULL,\n    lastname VARCHAR(128) NOT NULL,\n    othername VARCHAR(128) NOT NULL,\n    username VARCHAR(128) NOT NULL,\n    phoneNumber INTEGER,\n    isAdmin BOOLEAN default FALSE\n  );';

  pool.query(queryText).then(function (res) {
    // console.log(res);
    pool.end();
  }).catch(function (err) {
    // console.log(err);
    pool.end();
  });
};

// Create All Tables
var createAllTables = function createAllTables() {
  createRecordsTable();
  createUserTable();
};

createAllTables();

require('make-runnable');
//# sourceMappingURL=createTable.js.map