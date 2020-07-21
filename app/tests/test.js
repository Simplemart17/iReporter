import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
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
});

// Test for signup
describe('POST /Register', () => {
  it('should signup a new user successfully', (done) => {
    chai.request(app)
      .post(`${baseUrl}/auth/signup`)
      .send({
        fullname: 'Senator',
        email: 'govern@gmail.com',
        phonenumber: '08034567890',
        username: 'presidential',
        password: 'represent@t1v3',
      })
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it('should return error when any of the field is empty', (done) => {
    chai.request(app)
      .post(`${baseUrl}/auth/signup`)
      .send({
        fullname: ' ',
        email: 'govern@gmail.com',
        phonenumber: '08034567890',
        username: 'presidential',
        password: 'represent@t1v3',
      })
      .end((err, res) => {
        const error = { fullname: 'Fullname field cannot be empty' };
        res.should.have.status(400);
        res.body.should.be.a('object');
        error.should.have.property('fullname').equal('Fullname field cannot be empty');
        done();
      });
  });
});

// Test for authentication
describe('POST /Signin', () => {
  it('should sign in new user with right credential and get token', (done) => {
    chai.request(app)
      .post(`${baseUrl}/auth/signin`)
      .send({ email: 'govern@gmail.com', password: 'represent@t1v3' })
      .end((err, res) => {
        const { token } = res.body;
        const { email } = jwt.decode(token);
        res.should.have.status(200);
        res.body.message.should.equal('You have successfully signed in!');
        email.should.equal('govern@gmail.com');
        done();
      });
  });

  it('should return error for invalid credentials', (done) => {
    chai.request(app)
      .post(`${baseUrl}/auth/signin`)
      .send({ email: 'govern@gmail.com', password: 'represent' })
      .end((err, res) => {
        res.should.have.status(404);
        res.body.error.should.equal('Incorrect email or password');
        done();
      });
  });
});

describe('GET /Users', () => {
  let adminToken = null;
  let userToken = null;
  before((done) => {
    chai.request(app)
      .post(`${baseUrl}/auth/signin`)
      .send({ email: 'admin@admin.com', password: 'admin' })
      .end((err, res) => {
        adminToken = res.body.token;
        done(err);
      });
  });
  it('should get all users with the right permission', (done) => {
    chai.request(app)
      .get(`${baseUrl}/auth/users`)
      .set('x-access-token', adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.equal('Users successfully retrieved!');
        done();
      });
  });

  it('should return error when there is no permission to access the route', (done) => {
    chai.request(app)
      .post(`${baseUrl}/auth/signin`)
      .send({ email: 'govern@gmail.com', password: 'represent@t1v3' })
      .end((err, res) => {
        userToken = res.body.token;
        chai.request(app)
          .get(`${baseUrl}/auth/users`)
          .set('x-access-token', userToken)
          .end((error, resp) => {
            resp.should.have.status(403);
            resp.body.error.should.equal('You cannot access this route!');
            done(error);
          });
      });
  });
});

// Test for Redflags Route
// describe('POST /Redflags', () => {
//   it('should add a new redflag record', (done) => {
//     chai.request(app)
//       .post('/api/v1/record/red-flags')
//       .send({
//         title: 'title',
//         type: 'Redflag',
//         location: 'Surulere, Lagos',
//         status: 'Draft',
//         imageUrl: 'image.jpeg',
//         videoUrl: 'youtube.com/lootedfund',
//         comment: 'New comment',
//       })
//       .end((err, res) => {
//         res.should.have.status(201);
//         res.should.be.json();
//         res.body.should.be.a('object');
//         res.body.should.have.property('title').equal('title');
//         res.body.should.have.property('comment').equal('New comment');
//         res.body.should.have.property('message').equal('Redflag record created');
//         done();
//       });
//   });

//   it('should return error when any of the field is empty', (done) => {
//     chai.request(app)
//       .post('/api/v1/record/red-flags')
//       .send({
//         title: ' ',
//         type: 'Redflag',
//         location: 'Surulere, Lagos',
//         status: 'Draft',
//         imageUrl: 'image.jpeg',
//         videoUrl: 'youtube.com/lootedfund',
//         comment: 'New comment',
//       })
//       .end((err, res) => {
//         res.should.have.status(400);
//         res.should.be.json();
//         res.body.should.be.a('object');
//         res.body.should.have.property('error').equal('Title field cannot be empty');
//         done();
//       });
//   });

//   it('should return error when type is not redflag', (done) => {
//     chai.request(app)
//       .post('/api/v1/record/red-flags')
//       .send({
//         title: 'title',
//         type: 'no_type',
//         location: 'Surulere, Lagos',
//         status: 'Draft',
//         imageUrl: 'image.jpeg',
//         videoUrl: 'youtube.com/lootedfund',
//         comment: 'New comment',
//       })
//       .end((err, res) => {
//         res.should.have.status(400);
//         res.should.be.json();
//         res.body.should.be.a('object');
//         res.body.should.have.property('error').equal('Select a valid record type');
//         done();
//       });
//   });
// });

// describe('GET/ Redflags', () => {
//   it('should GET all redflags records', (done) => {
//     chai.request(app)
//       .get('/api/v1/record/red-flags')
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.should.be.json();
//         res.body.should.be.a('object');
//         res.body.should.have.property('message').equal('Redflags records retrieved');
//         done();
//       });
//   });
// });

// describe('GET /Redflags /:id', () => {
//   it('should GET a redflag record by its id', (done) => {
//     chai.request(app)
//       .get('/api/v1/record/red-flags/1')
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.body.should.be.a('object');
//         res.body.should.have.property('records');
//         res.body.should.have.property('message').equal('Redflag record retrieved');
//         done();
//       });
//   });

//   it('returns status 404 when id is not found', (done) => {
//     const records = {
//       id: 'Not present',
//     };
//     chai.request(app)
//       .get(`/api/v1/record/red-flags${records.id}`)
//       .end((err, res) => {
//         res.should.have.status(404);
//         done();
//       });
//   });
// });

// describe('PATCH /Redflag/', () => {
//   it('should update location of a redflag record', (done) => {
//     chai.request(app)
//       .get('/api/v1/record/red-flags')
//       .end((err, res) => {
//         chai.request(app)
//           .patch('/api/v1/record/red-flags/1/location')
//           .send({ location: 'long -92, lat 113' })
//           .end(() => {
//             res.should.have.status(201);
//             res.should.be.json();
//             res.body.should.be.a('object');
//             res.body.should.have.property('message');
//             res.body.message.should.equal('Redflag location successfully updated!');
//             done();
//           });
//       });
//   });

//   it('should update comment of a redflag record', (done) => {
//     chai.request(app)
//       .get('/api/v1/record/red-flags')
//       .end((err, res) => {
//         chai.request(app)
//           .patch('/api/v1/record/red-flags/1/comment')
//           .send({ comment: 'my comment' })
//           .end(() => {
//             res.should.have.status(201);
//             res.body.should.be.a('object');
//             res.body.should.have.property('message');
//             res.body.message.should.equal('Redflag comment updated successfully!');
//             done();
//           });
//       });
//   });

//   it('should return error when location field is empty', (done) => {
//     chai.request(app)
//       .get('/api/v1/record/red-flags')
//       .end((err, res) => {
//         chai.request(app)
//           .patch('/api/v1/record/red-flags/1/location')
//           .send({ ' ': ' ' })
//           .end(() => {
//             res.should.have.status(400);
//             res.body.should.have.property('error').equal('location field is required');
//             done();
//           });
//       });
//   });

//   it('should return error when comment field is empty', (done) => {
//     chai.request(app)
//       .get('/api/v1/record/red-flags')
//       .end((err, res) => {
//         chai.request(app)
//           .patch('/api/v1/record/red-flags/1/comment')
//           .send({ ' ': ' ' })
//           .end(() => {
//             res.should.have.status(400);
//             res.body.should.have.property('error').equal('This field is required');
//             done();
//           });
//       });
//   });
// });

// describe('DELETE /Redflag', () => {
//   it('shoud delete redflag record from the database', (done) => {
//     chai.request(app)
//       .get('/api/v1/record/red-flags')
//       .end((err, res) => {
//         chai.request(app)
//           .delete('/api/v1/record/red-flags/1')
//           .end(() => {
//             res.should.have.status(200);
//             res.should.be.json();
//             res.body.should.have.property('message').equal('Redflag record deleted successfully');
//             done(err);
//           });
//       });
//   });

//   it('should return an error if the id is not found', (done) => {
//     chai.request(app)
//       .post('/api/v1/record/red-flags')
//       .end((err, res) => {
//         chai.request(app)
//           .delete('/api/v1/record/red-flags/7878')
//           .end(() => {
//             res.should.have.status(404);
//             res.body.should.have.property('message').equal('Redflag record not found');
//             done();
//           });
//       });
//   });
// });

// Test for Intervention route
// describe('POST /Intervention', () => {
//   it('should add a new intervention record', (done) => {
//     chai.request(app)
//       .post('/api/v1/record/intervention')
//       .send({
//         createdOn: '2018-12-12',
//         title: 'title',
//         createdBy: '1',
//         type: 'Intervention',
//         location: 'long -102, lat 111',
//         imageUrl: 'image.jpeg',
//         videoUrl: 'youtube.com/lootedfund',
//         comment: 'New comment',
//       })
//       .end((err, res) => {
//         res.should.have.status(201);
//         res.should.be.json();
//         res.body.should.be.a('object');
//         res.body.should.have.property('records');
//         res.body.should.have.property('message');
//         res.body.message.should.equal('Intervention record created');
//         done();
//       });
//   });

//   it('should return error when any of the field is empty', (done) => {
//     chai.request(app)
//       .post('/api/v1/record/intervention')
//       .send({
//         ' ': ' ',
//       })
//       .end((err, res) => {
//         res.should.have.status(400);
//         res.should.be.json();
//         res.body.should.have.property('error').equal('All fields are required!');
//         done();
//       });
//   });
// });

// describe('GET/ Interventions', () => {
//   it('should GET all interventions records', (done) => {
//     chai.request(app)
//       .get('/api/v1/record/intervention')
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.should.be.json();
//         res.body.should.be.a('object');
//         res.body.should.have.property('message').equal('Intervention records retrieved');
//         done();
//       });
//   });
// });

// describe('GET /Interventions /:id', () => {
//   it('should GET an intervention record by its id', (done) => {
//     chai.request(app)
//       .get('/api/v1/record/intervention/1')
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.body.should.be.a('object');
//         res.body.should.have.property('records');
//         res.body.should.have.property('message').equal('Intervention record retrieved');
//         done();
//       });
//   });

//   it('returns status 404 when id is not found', (done) => {
//     const records = {
//       id: 'Not present',
//     };
//     chai.request(app)
//       .get(`/api/v1/record/intervention${records.id}`)
//       .end((err, res) => {
//         res.should.have.status(404);
//         done();
//       });
//   });
// });

// describe('PATCH /Intervention/', () => {
//   it('should update location of a intervention record', (done) => {
//     chai.request(app)
//       .get('/api/v1/record/intervention')
//       .end((err, res) => {
//         chai.request(app)
//           .patch('/api/v1/record/intervention/1/location')
//           .send({ location: 'long -92, lat 113' })
//           .end(() => {
//             res.should.have.status(201);
//             res.should.be.json();
//             res.body.should.be.a('object');
//             res.body.should.have.property('message');
//             res.body.message.should.equal('Intervention location successfully updated!');
//             done();
//           });
//       });
//   });

//   it('should update comment of an intervention record', (done) => {
//     chai.request(app)
//       .get('/api/v1/record/intervention')
//       .end((err, res) => {
//         chai.request(app)
//           .patch('/api/v1/record/intervention/1/comment')
//           .send({ comment: 'my comment' })
//           .end(() => {
//             res.should.have.status(201);
//             res.body.should.be.a('object');
//             res.body.should.have.property('message');
//             res.body.message.should.equal('Intervention comment updated successfully!');
//             done();
//           });
//       });
//   });

//   it('should return error when location field is empty', (done) => {
//     chai.request(app)
//       .get('/api/v1/record/intervention')
//       .end((err, res) => {
//         chai.request(app)
//           .patch('/api/v1/record/intervention/1/location')
//           .send({ ' ': ' ' })
//           .end(() => {
//             res.should.have.status(400);
//             res.body.should.have.property('error').equal('location field is required');
//             done();
//           });
//       });
//   });

//   it('should return error when comment field is empty', (done) => {
//     chai.request(app)
//       .get('/api/v1/record/intervention')
//       .end((err, res) => {
//         chai.request(app)
//           .patch('/api/v1/record/intervention/1/comment')
//           .send({ ' ': ' ' })
//           .end(() => {
//             res.should.have.status(400);
//             res.body.should.have.property('error').equal('This field is required');
//             done();
//           });
//       });
//   });
// });

// describe('DELETE /Intervention', () => {
//   it('shoud delete intervention record from the database', (done) => {
//     chai.request(app)
//       .get('/api/v1/record/intervention')
//       .end((err, res) => {
//         chai.request(app)
//           .delete('/api/v1/record/intervention/1')
//           .end(() => {
//             res.should.have.status(200);
//             res.should.be.json();
//             res.body.should.have.property('message').equal('Intervention record deleted successfully');
//             done();
//           });
//       });
//   });

//   it('should return an error if the id is not found', (done) => {
//     chai.request(app)
//       .post('/api/v1/record/intervention')
//       .end((err, res) => {
//         chai.request(app)
//           .delete('/api/v1/record/intervention/7878')
//           .end(() => {
//             res.should.have.status(404);
//             res.body.should.have.property('message').equal('Intervention record not found');
//             done();
//           });
//       });
//   });
// });
