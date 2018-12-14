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
    title VARCHAR(128) NOT NULL,
    createdBy INTEGERNOT NULL,
    type VARCHAR(128) NOT NULL,
    location VARCHAR(128) NOT NULL,
    status VARCHAR(128) NOT NULL,
    Images TEXT[],
    Videos TEXT[],
    comment VARCHAR(128) NOT NULL
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
    email VARCHAR(128) UNIQUE NOT NULL,
    password VARCHAR(128) NOT NULL,
    firstaname VARCHAR(128) NOT NULL,
    lastname VARCHAR(128) NOT NULL,
    othername VARCHAR(128) NOT NULL,
    username VARCHAR(128) NOT NULL,
    phoneNumber VARCHAR(128) NOT NULL,
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
