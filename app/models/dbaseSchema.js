const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
// console.log(process.env.DATABASE_URL);

pool.on('connect', () => {
  console.log('connected to database');
});
pool.connect();

// Table for records
const createRecordsTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
  records(
    id UUID PRIMARY KEY,
    title VARCHAR(128) NOT NULL,
    createdBy VARCHAR(128) NOT NULL,
    type VARCHAR(128) NOT NULL,
    location VARCHAR(128) NOT NULL,
    status VARCHAR(128) NOT NULL,
    Images TEXT,
    Videos TEXT,
    comment VARCHAR(128) NOT NULL
);`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

// Create Users Table
const createUserTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
  users(
    id UUID PRIMARY KEY,
    email VARCHAR(128) UNIQUE NOT NULL,
    password VARCHAR(128) NOT NULL,
    firstaname VARCHAR(128) NOT NULL,
    lastname VARCHAR(128) NOT NULL,
    othername VARCHAR(128) NOT NULL,
    username VARCHAR(128) NOT NULL,
    phoneNumber INTEGER,
    isAdmin BOOLEAN default FALSE
  );`;

  pool.query(queryText)
    .then((res) => {
      // console.log(res);
      pool.end();
    })
    .catch((err) => {
      // console.log(err);
      pool.end();
    });
};

const dropRecordsTable = () => {
  const queryText = 'DROP TABLE IF EXISTS records returning *';
  pool.query(queryText)
    .then((res) => {
      // console.log(res);
      pool.end();
    })
    .catch((err) => {
      // console.log(err);
      pool.end();
    });
};

const dropUsersTable = () => {
  const queryText = 'DROP TABLE IF EXISTS users returning *';
  pool.query(queryText)
    .then((res) => {
      // console.log(res);
      pool.end();
    })
    .catch((err) => {
      // console.log(err);
      pool.end();
    });
};

// Create All Tables
const createAllTables = () => {
  createRecordsTable();
  createUserTable();
};

// Drop All Tables
const dropAllTables = () => {
  dropRecordsTable();
  dropUsersTable();
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createRecordsTable,
  createUserTable,
  createAllTables,
  dropRecordsTable,
  dropUsersTable,
  dropAllTables,
};

require('make-runnable');
