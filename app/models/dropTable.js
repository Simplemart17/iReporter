import { Pool }  from 'pg';
import dotenv  from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
// console.log(process.env.DATABASE_URL);

pool.on('connect', () => {
  // console.log('connected to database');
});
pool.connect();

const dropRecordsTable = () => {
  const queryText = 'DROP TABLE records';
  pool.query(queryText)
    .then((res) => {
      // console.log(res);
    })
    .catch((err) => {
      // console.log(err);
    });
};

const dropUsersTable = () => {
  const queryText = 'DROP TABLE users';
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

// Drop All Tables
const dropAllTables = () => {
  dropRecordsTable();
  dropUsersTable();
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

dropAllTables();
