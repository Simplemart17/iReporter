import { Pool }  from 'pg';
import dotenv  from 'dotenv';

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
    id SERIAL PRIMARY KEY,
    createdOn DATE DEFAULT CURRENT_DATE,
    title VARCHAR(255) NOT NULL,
    createdBy INTEGER NOT NULL,
    type VARCHAR(128) NOT NULL,
    location VARCHAR(128) NOT NULL,
    status VARCHAR(128),
    images VARCHAR(128),
    videos VARCHAR(128),
    comment TEXT NOT NULL,
    FOREIGN KEY (createdBy) REFERENCES users (id) ON DELETE CASCADE
);`;

  pool.query(queryText)
    .then((res) => {
      // console.log(res);
    })
    .catch((err) => {
      // console.log(err);
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
    username VARCHAR(128) UNIQUE NOT NULL,
    registered DATE DEFAULT CURRENT_DATE,
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
