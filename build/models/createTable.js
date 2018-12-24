'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dropAllTables = exports.createAllTables = exports.dropRecordsTable = exports.createRecordsTable = exports.dropUsersTable = exports.createUserTable = undefined;

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
// pool.connect();

// Create Users Table
var createUserTable = function createUserTable() {
  var queryText = 'CREATE TABLE IF NOT EXISTS\n  users(\n    id SERIAL PRIMARY KEY,\n    firstname VARCHAR(128) NOT NULL,\n    lastname VARCHAR(128) NOT NULL,\n    othername VARCHAR(128) NOT NULL,\n    email VARCHAR(128) UNIQUE NOT NULL,\n    phoneNumber BIGINT,\n    username VARCHAR(128) UNIQUE NOT NULL,\n    registered DATE DEFAULT CURRENT_DATE,\n    password VARCHAR(128) NOT NULL,\n    isAdmin BOOLEAN default FALSE\n  );';
  pool.query(queryText);
};

var dropUsersTable = function dropUsersTable() {
  var queryText = 'DROP TABLE users';
  pool.query(queryText);
};

// Table for records
var createRecordsTable = function createRecordsTable() {
  var queryText = 'CREATE TABLE IF NOT EXISTS\n  records(\n    id SERIAL PRIMARY KEY,\n    createdOn DATE DEFAULT CURRENT_DATE,\n    title VARCHAR(255) NOT NULL,\n    createdBy INTEGER NOT NULL,\n    type VARCHAR(128) NOT NULL,\n    location VARCHAR(128) NOT NULL,\n    status VARCHAR(128),\n    images VARCHAR(128),\n    videos VARCHAR(128),\n    comment TEXT NOT NULL,\n    FOREIGN KEY (createdBy) REFERENCES users (id) ON DELETE CASCADE\n);';
  pool.query(queryText);
};

var dropRecordsTable = function dropRecordsTable() {
  var queryText = 'DROP TABLE records';
  pool.query(queryText);
};

pool.on('remove', function () {
  console.log('client removed');
  process.exit(0);
});

var createAllTables = function createAllTables() {
  createUserTable(), createRecordsTable();
};

var dropAllTables = function dropAllTables() {
  dropUsersTable(), dropRecordsTable();
};

exports.createUserTable = createUserTable;
exports.dropUsersTable = dropUsersTable;
exports.createRecordsTable = createRecordsTable;
exports.dropRecordsTable = dropRecordsTable;
exports.createAllTables = createAllTables;
exports.dropAllTables = dropAllTables;
//# sourceMappingURL=createTable.js.map