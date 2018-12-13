// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';

// const secret = '../../secret';

// const Helper = {
//   hashPassword(password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
//   },

//   // To compare registered ans signin password
//   comparePassword(hashPassword, password) {
//     return bcrypt.compareSync(password, hashPassword);
//   },

//   // To validate email
//   isValidEmail(email) {
//     return /\S+@\S+\.\S/.test(email);
//   },

//   // Token generation
//   generateToken(id) {
//     const token = jwt.sign({
//       userId: id
//     },
//       secret, { expiresIn: 24352 }
//     );
//     return token;
//   }
// }

// export default Helper;