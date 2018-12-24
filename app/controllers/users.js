import dBase from '../models/query';
import { generateToken, generateHashPassword, comparePassword } from '../middleware/Helper.js';

const Users = {
  async createUser(req, res) {
    const hashPassword = generateHashPassword(req.body.password);

    const createQuery = `INSERT INTO users(firstname, lastname, othername, email, phoneNumber, username, password, isAdmin)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8) returning *`;
    const values = [
      req.body.firstname,
      req.body.lastname,
      req.body.othername,
      req.body.email,
      req.body.phoneNumber,
      req.body.username,
      hashPassword,
      req.body.isAdmin || 'false'
    ];
    try {
      const { rows } = await dBase.query(createQuery, values);
      const token = generateToken(rows[0].id);
      return res.status(201).json({
        message: 'You have successfully registered!',
        token: token
      });
    } catch(error) {
      // console.log(error);
      if (error.constraint === 'users_email_key') {
        return res.status(400).json({ error: 'Email already exist!' })
      } else if (error.constraint === 'users_username_key') {
        return res.status(400).json({ error: 'Username already exist!' })
      }
      return res.json(error);
    }
  },

  async signin(req, res) {
    const text = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await dBase.query(text, [req.body.email]);
      if (!rows[0]) {
        return res.status(400).json({ error: 'Incorrect email address' });
      }
      if (!comparePassword(rows[0].password, req.body.password)) {
        return res.status(400).json({ error: 'Incorrect password' });
      }
      const token = generateToken(rows[0].id);
      return res.status(200).json({
        message: 'You have successfully signed in!',
        token: token
      });
    } catch(error) {
      // console.log(error)
      return res.json(error);
    }
  },

  async getUsers(req, res) {
    const findAllUsers = `SELECT * FROM users`;
    try {
      const { rows, rowCount } = await dBase.query(findAllUsers);
      if (!rows[0]) {
        return res.status(404).json({
          error: 'No user found!',
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
  },
}

export default Users;