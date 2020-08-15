import chai from 'chai';
import chaiHttp from 'chai-http';
// import jwt from 'jsonwebtoken';
import app from '../app';

chai.use(chaiHttp);

// eslint-disable-next-line no-unused-vars
const { should } = chai.should();
const baseUrl = '/api/v1';

// Homepage test
describe('HOMEPAGE', () => {
  it('should send welcome message for the app', (done) => {
    chai.request(app)
      .get(baseUrl)
      .end((err, res) => {
        res.body.should.have.property('message');
        res.body.message.should.equal('Welcome to IReporter');
        done(err);
      });
  });

  it('should return error for non existing route', (done) => {
    chai.request(app)
      .get(`${baseUrl}/no-route`)
      .end((err, res) => {
        res.body.should.have.property('error');
        res.body.error.should.equal('The page cannot be found!');
        done(err);
      });
  });
});

// // Test for signup
// describe('POST /Register', () => {
//   it('should signup a new user successfully', (done) => {
//     chai.request(app)
//       .post(`${baseUrl}/auth/signup`)
//       .send({
//         fullname: 'Senator',
//         email: 'govern@gmail.com',
//         phonenumber: '08034567890',
//         username: 'presidential',
//         password: 'represent@t1v3',
//       })
//       .end((err, res) => {
//         res.should.have.status(201);
//         done(err);
//       });
//   });

//   it('should return error when any of the field is empty', (done) => {
//     chai.request(app)
//       .post(`${baseUrl}/auth/signup`)
//       .send({
//         fullname: ' ',
//         email: 'govern@gmail.com',
//         phonenumber: '08034567890',
//         username: 'presidential',
//         password: 'represent@t1v3',
//       })
//       .end((err, res) => {
//         const error = { fullname: 'Fullname field cannot be empty' };
//         res.should.have.status(400);
//         res.body.should.be.a('object');
//         error.should.have.property('fullname').equal('Fullname field cannot be empty');
//         done(err);
//       });
//   });

//   it('should return error for existing email address', (done) => {
//     chai.request(app)
//       .post(`${baseUrl}/auth/signup`)
//       .send({
//         fullname: 'Enator',
//         email: 'govern@gmail.com',
//         phonenumber: '08034567891',
//         username: 'presidential2',
//         password: 'represent@t1v3',
//       })
//       .end((err, res) => {
//         res.should.have.status(409);
//         done(err);
//       });
//   });

//   it('should return error for existing phone number', (done) => {
//     chai.request(app)
//       .post(`${baseUrl}/auth/signup`)
//       .send({
//         fullname: 'Senator',
//         email: 'govern2@gmail.com',
//         phonenumber: '08034567890',
//         username: 'presidential2',
//         password: 'represent@t1v3',
//       })
//       .end((err, res) => {
//         res.should.have.status(409);
//         done(err);
//       });
//   });
// });

// // Test for authentication
// describe('POST /Signin', () => {
//   it('should sign in new user with right credential and get token', (done) => {
//     chai.request(app)
//       .post(`${baseUrl}/auth/signin`)
//       .send({ email: 'govern@gmail.com', password: 'represent@t1v3' })
//       .end((err, res) => {
//         const { token } = res.body;
//         const { email } = jwt.decode(token);
//         res.should.have.status(200);
//         res.body.message.should.equal('You have successfully signed in!');
//         email.should.equal('govern@gmail.com');
//         done(err);
//       });
//   });

//   it('should return error for invalid credentials', (done) => {
//     chai.request(app)
//       .post(`${baseUrl}/auth/signin`)
//       .send({ email: 'govern@gmail.com', password: 'represent' })
//       .end((err, res) => {
//         res.should.have.status(404);
//         res.body.error.should.equal('Incorrect email or password');
//         done(err);
//       });
//   });
// });

// describe('GET /Users', () => {
//   let adminToken = null;
//   let userToken = null;
//   before((done) => {
//     chai.request(app)
//       .post(`${baseUrl}/auth/signin`)
//       .send({ email: 'admin@admin.com', password: 'admin' })
//       .end((err, res) => {
//         adminToken = res.body.token;
//         done(err);
//       });
//   });

//   it('should get all users with the right permission', (done) => {
//     chai.request(app)
//       .get(`${baseUrl}/auth/users`)
//       .set('x-access-token', adminToken)
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.body.message.should.equal('Users successfully retrieved!');
//         done(err);
//       });
//   });

//   it('should return error when there is no permission to access the route', (done) => {
//     chai.request(app)
//       .post(`${baseUrl}/auth/signin`)
//       .send({ email: 'govern@gmail.com', password: 'represent@t1v3' })
//       .end((err, res) => {
//         userToken = res.body.token;
//         chai.request(app)
//           .get(`${baseUrl}/auth/users`)
//           .set('x-access-token', userToken)
//           .end((error, resp) => {
//             resp.should.have.status(403);
//             resp.body.error.should.equal('You cannot access this route!');
//             done(error);
//           });
//       });
//   });
// });

// // Test for creating record
// describe('POST /Records', () => {
//   let userToken = null;
//   before((done) => {
//     chai.request(app)
//       .post(`${baseUrl}/auth/signin`)
//       .send({ email: 'govern@gmail.com', password: 'represent@t1v3' })
//       .end((err, res) => {
//         userToken = res.body.token;
//         done(err);
//       });
//   });

//   it('should add a new redflag record', (done) => {
//     chai.request(app)
//       .post('/api/v1/records')
//       .send({
//         title: 'title',
//         type: 'Redflag',
//         location: 'Surulere, Lagos',
//         status: 'Draft',
//         imageUrl: 'image.jpeg',
//         videoUrl: 'youtube.com/lootedfund',
//         comment: 'New comment',
//       })
//       .set('x-access-token', userToken)
//       .end((err, res) => {
//         res.should.have.status(201);
//         res.body.should.be.a('object');
//         done(err);
//       });
//   });

//   it('should return list of records by user', (done) => {
//     chai.request(app)
//       .get('/api/v1/records')
//       .set('x-access-token', userToken)
//       .end((err, res) => {
//         res.should.have.status(200);
//         done(err);
//       });
//   });

//   it('should filter record by type', (done) => {
//     chai.request(app)
//       .get('/api/v1/records?recordType=Redflag')
//       .set('x-access-token', userToken)
//       .end((err, res) => {
//         res.should.have.status(200);
//         done(err);
//       });
//   });
// });
