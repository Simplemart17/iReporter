// import { Pool }  from 'pg';
// import dotenv  from 'dotenv';

// dotenv.config();

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });
// // console.log(process.env.DATABASE_URL);


// const dropRecordsTable = () => {
//   const queryText = 'DROP TABLE records';
//   pool.query(queryText)
// };

// const dropUsersTable = () => {
//   const queryText = 'DROP TABLE users';
//   pool.query(queryText)
// };

// // Drop All Tables
// const dropAllTables = () => {
//   dropUsersTable();
//   dropRecordsTable();
// };

// pool.on('remove', () => {
//   console.log('client removed');
//   process.exit(0);
// });

// dropAllTables();
"use strict";
//# sourceMappingURL=dropTable.js.map