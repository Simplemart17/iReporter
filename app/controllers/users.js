// import uuidv4 from 'uuid/v4';
// import dBase from '../models/query';
// import Helper from '../Helper/Helper';

// const Users = {
//   async createUser(req, res) {
//     if (!req.body.email || !req.body.password) {
//       return res.status(400).send({message: 'Required field missing'});
//     }
//     if (!Helper.isValidEmail(req.body.email)) {
//       return res.status(400).send({message: 'Enter a valid email address'});
//     }
//     const hashPassword = Helper.hashPassword(req.body.password);

//     const createQuery = `INSERT INTO users(id, email, password, firstaname, lastname, othername, username, phoneNumber, isAdmin)
//     VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *`;
//     const values = [
//       uuidv4(),
//       req.body.email,
//       hashPassword,
//       req.body.firstname,
//       req.body.lastname,
//       req.body.othername,
//       req.body.username,
//       req.body.phoneNumber,
//       req.body.isAdmin
//     ];

//     try {
//       const { row } = await dBase.query(createQuery, values);
//       const token = Helper.generateToken(row[0].id);
//       return res.status(201).send({ token: token });
//     } catch(error) {
//       if (error.routine === '_bt _check_unique') {
//         console.log(error);
//         return res.status(400).send({message: 'Email already exist'})
//       }
//       console.log(error);
//       return res.send(error);
//     }
//   },

//   async login(req, res) {
//     if (!req.body.email || !req.body.password) {
//       return res.status(400).send({message: 'Required field is missing'});
//     }
//     const text = 'SELECT * FROM users WHERE email = $1';
//     try {
//       const { rows } = await dBase.query(text, [req.body.email]);
//       if (!row[0]) {
//         return res.status(400).send({message: 'Incorrect details'});
//       }
//       if (!Helper.comparePassword(row[0].password, req.body.password)) {
//         return res.status(400).send({message: 'Incorrect password'});
//       }
//       const token = Helper.generateToken(rows[0].id);
//       return res.status(200).send({token: token});
//     } catch(error) {
//       return res.send(error);
//     }
//   },
// }

// export default Users;