// import jwt from 'jsonwebtoken';
// import dBase from '../models/query';

// const secret ='../../secret';


// const Auth = {
//   async verifyToken(req, res, next) {
//     const token = req.headers['x-access-token'];
//     if (!token) {
//       return res.status(400).send({ message: 'Token is not provided' });
//     }
//     try {
//       const decoded = await jwt.verify(token, secret);
//       const text = 'SELECT * FROM user WHERE id = $1';
//       const { rows } = await dBase.query(text, [decoded.userId]);
//       if (!rows[0]) {
//         return res.status(400).send({ message: 'The token you provided is invalid' });
//       }
//       req.user = { id: decoded.userId };
//       next();
//     }
//     catch (error) {
//       return res.status(400).send(error);
//     }
//   },
// };

// export default Auth;
