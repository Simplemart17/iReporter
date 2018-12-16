import { Pool }  from 'pg';
import dotenv  from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
console.log(process.env.DATABASE_URL);

pool.on('connect', () => {
  console.log('connected to database');
});
pool.connect();

// Table for records
const createRecordsTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
  records(
    id SERIAL PRIMARY KEY,
    createdOn DATE DEFAULT CURRENT_DATE,
    title VARCHAR(128),
    createdBy INTEGER,
    type VARCHAR(128),
    location VARCHAR(128),
    status VARCHAR(128),
    images VARCHAR,
    videos VARCHAR,
    comment VARCHAR(128)
);`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Create Users Table
const createUserTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
  users(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(128) NOT NULL,
    lastname VARCHAR(128) NOT NULL,
    othername VARCHAR(128) NOT NULL,
    email VARCHAR(128) UNIQUE NOT NULL,
    phoneNumber BIGINT,
    username VARCHAR(128) NOT NULL,
    registered TIMESTAMP,
    password VARCHAR(128) NOT NULL,
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

// Create All Tables
const createAllTables = () => {
  createRecordsTable();
  createUserTable();
};

createAllTables();
