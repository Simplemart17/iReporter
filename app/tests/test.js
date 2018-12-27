import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);

const { should } = chai.should();

// Get token
let token = [];

// Test for signup
describe('POST /User', () => {
  it('should signup a new user successfully', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'Senator',
        lastname: 'Governor',
        othername: 'Chairman',
        email: 'govern@gmail.com',
        phoneNumber: '08034567890',
        username: 'presidential',
        password: 'represent@t1v3'
      })
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
  
  it('should return error when any of the field is empty', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: ' ',
        lastname: 'Governor',
        othername: 'Chairman',
        email: 'govern@gmail.com',
        phoneNumber: '08034567890',
        username: 'presidential',
        password: 'represent@t1v3'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error').equal('Firstname field cannot be empty');
        done();
      });
  });
});

// Test for Redflags Route
// describe('POST /Redflags', () => {
//     it('should add a new redflag record', (done) => {
//       chai.request(app)
//         .post('/api/v1/record/red-flags')
//         .send({
//           title: 'title',
//           type: 'Redflag',
//           location: 'Surulere, Lagos',
//           status: 'Draft',
//           images: 'image.jpeg',
//           videos: 'youtube.com/lootedfund',
//           comment: 'New comment'
//         })
//         .end((err, res) => {
//           res.should.have.status(201);
//           res.should.be.json;
//           res.body.should.be.a('object');
//           res.body.should.have.property('title').equal('title');
//           res.body.should.have.property('comment).equal('New comment');
//           res.body.should.have.property('message').equal('Redflag record created');
//           done();
//         });
//     }); 

//     it('should return error when any of the field is empty', (done) => {
//       chai.request(app)
//       .post('/api/v1/record/red-flags')
//       .send({
//         title: ' ',
//         type: 'Redflag',
//         location: 'Surulere, Lagos',
//         status: 'Draft',
//         images: 'image.jpeg',
//         videos: 'youtube.com/lootedfund',
//         comment: 'New comment'
//       })
//         .end((err, res) => {
//           res.should.have.status(400);
//           res.should.be.json;
//           res.body.should.be.a('object');
//           res.body.should.have.property('error').equal('Title field cannot be empty');
//           done();
//         });
//     });

//     it('should return error when type is not redflag', (done) => {
//       chai.request(app)
//       .post('/api/v1/record/red-flags')
//       .send({
//         title: 'title',
//         type: 'no_type',
//         location: 'Surulere, Lagos',
//         status: 'Draft',
//         images: 'image.jpeg',
//         videos: 'youtube.com/lootedfund',
//         comment: 'New comment'
//       })
//         .end((err, res) => {
//           res.should.have.status(400);
//           res.should.be.json;
//           res.body.should.be.a('object');
//           res.body.should.have.property('error').equal('Select a valid record type');
//           done();
//         });
//     });
//   });

// describe('GET/ Redflags', () => {
//   it('should GET all redflags records', (done) => {
//       chai.request(app)
//         .get('/api/v1/record/red-flags')
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.should.be.json;
//           res.body.should.be.a('object');
//           res.body.should.have.property('message').equal('Redflags records retrieved');
//           done();
//         });
//     });
//   });

//   describe('GET /Redflags /:id', () => {
//     it('should GET a redflag record by its id', (done) => {
//       chai.request(app)
//           .get('/api/v1/record/red-flags/1')
//           .end((err, res) => {
//             res.should.have.status(200);
//             res.body.should.be.a('object');
//             res.body.should.have.property('records');
//             res.body.should.have.property('message').equal('Redflag record retrieved');
//             done();
//           });
//       });

//       it('returns status 404 when id is not found', (done) => {
//         const records = {
//           id: 'Not present'
//         }
//         chai.request(app)
//           .get('/api/v1/record/red-flags' + records.id)
//           .end((err, res) => {
//           res.should.have.status(404);
//           done();
//         });
//       });
//   });

//   describe('PATCH /Redflag/', () => {
//     it('should update location of a redflag record', (done) => {
//      chai.request(app)
//         .get('/api/v1/record/red-flags')
//         .end((err, res) => {
//           chai.request(app)
//             .patch(`/api/v1/record/red-flags/1/location`)
//             .send({'location': 'long -92, lat 113'})
//             .end((err, res) => {
//               res.should.have.status(201);
//               res.should.be.json;
//               res.body.should.be.a('object');
//               res.body.should.have.property('message');
//               res.body.message.should.equal('Redflag location successfully updated!');
//               done();
//             });
//         });
//     });

//     it('should update comment of a redflag record', (done) => {
//       chai.request(app)
//         .get('/api/v1/record/red-flags')
//         .end((err, res) => {
//           chai.request(app)
//             .patch(`/api/v1/record/red-flags/1/comment`)
//             .send({'comment': 'my comment'})
//             .end((err, res) => {
//               res.should.have.status(201);
//               res.body.should.be.a('object');
//               res.body.should.have.property('message');
//               res.body.message.should.equal('Redflag comment updated successfully!');
//               done();
//             });
//         });
//     });

//     it('should return error when location field is empty', (done) => {
//       chai.request(app)
//       .get('/api/v1/record/red-flags')
//         .end((err, res) => {
//           chai.request(app)
//             .patch('/api/v1/record/red-flags/1/location')
//             .send({' ': ' ' })
//             .end((err, res) => {
//               res.should.have.status(400);
//               res.body.should.have.property('error').equal('location field is required');
//               done();
//             });
//         });

//     });

//     it('should return error when comment field is empty', (done) => {
//       chai.request(app)
//       .get('/api/v1/record/red-flags')
//         .end((err, res) => {
//           chai.request(app)
//             .patch('/api/v1/record/red-flags/1/comment')
//             .send({' ': ' '})
//             .end((err, res) => {
//               res.should.have.status(400);
//               res.body.should.have.property('error').equal('This field is required');
//               done();
//             });
//         });
//     });
//   });

//   describe('DELETE /Redflag', () => {
//     it('shoud delete redflag record from the database', (done) => {
//       chai.request(app)
//       .get('/api/v1/record/red-flags')
//       .end((err, res) => {
//         chai.request(app)
//           .delete(`/api/v1/record/red-flags/1`)
//           .end((err, res) => {
//             res.should.have.status(200);
//             res.should.be.json;
//             res.body.should.have.property('message').equal('Redflag record deleted successfully');
//             done(err);
//           });
//       });
//     });

//     it('should return an error if the id is not found', (done) => {
//       chai.request(app)
//         .post('/api/v1/record/red-flags')
//         .end((err, res) => {
//           chai.request(app)
//           .delete('/api/v1/record/red-flags/7878')
//           .end((err, res) => {
//             res.should.have.status(404);
//             res.body.should.have.property('message').equal('Redflag record not found');
//             done();
//           });
//         });
//     });
//   });

//   // Test for Intervention route
//   describe('POST /Intervention', () => {
//     it('should add a new intervention record', (done) => {
//       chai.request(app)
//         .post('/api/v1/record/intervention')
//         .send({
//           'createdOn': '2018-12-12',
//           'title': 'title',
//           'createdBy': '1',
//           'type': 'Intervention',
//           'location': 'long -102, lat 111',
//           'images': 'image.jpeg',
//           'videos': 'youtube.com/lootedfund',
//           'comment': 'New comment'
//         })
//         .end((err, res) => {
//           res.should.have.status(201);
//           res.should.be.json;
//           res.body.should.be.a('object');
//           res.body.should.have.property('records');
//           res.body.should.have.property('message');
//           res.body.message.should.equal('Intervention record created')
//           done();
//         });
//     }); 

//     it('should return error when any of the field is empty', (done) => {
//       chai.request(app)
//       .post('/api/v1/record/intervention')
//         .send({
//           ' ': ' '
//         })
//         .end((err, res) => {
//           res.should.have.status(400);
//           res.should.be.json;
//           res.body.should.have.property('error').equal('All fields are required!');
//           done();
//         });
//     });
//   });

// describe('GET/ Interventions', () => {
//   it('should GET all interventions records', (done) => {
//       chai.request(app)
//         .get('/api/v1/record/intervention')
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.should.be.json;
//           res.body.should.be.a('object');
//           res.body.should.have.property('message').equal('Intervention records retrieved');
//         done();
//         });
//     });
//   });

//   describe('GET /Interventions /:id', () => {
//     it('should GET an intervention record by its id', (done) => {
//       chai.request(app)
//           .get('/api/v1/record/intervention/1')
//           .end((err, res) => {
//             res.should.have.status(200);
//             res.body.should.be.a('object');
//             res.body.should.have.property('records');
//             res.body.should.have.property('message').equal('Intervention record retrieved');
//             done();
//           });
//       });

//       it('returns status 404 when id is not found', (done) => {
//         const records = {
//           id: 'Not present'
//         }
//         chai.request(app)
//           .get('/api/v1/record/intervention' + records.id)
//           .end((err, res) => {
//           res.should.have.status(404);
//           done();
//         });
//       });
//   });

//   describe('PATCH /Intervention/', () => {
//     it('should update location of a intervention record', (done) => {
//      chai.request(app)
//         .get('/api/v1/record/intervention')
//         .end((err, res) => {
//           chai.request(app)
//             .patch(`/api/v1/record/intervention/1/location`)
//             .send({'location': 'long -92, lat 113'})
//             .end((err, res) => {
//               res.should.have.status(201);
//               res.should.be.json;
//               res.body.should.be.a('object');
//               res.body.should.have.property('message');
//               res.body.message.should.equal('Intervention location successfully updated!');
//               done();
//             });
//         });
//     });

//     it('should update comment of an intervention record', (done) => {
//       chai.request(app)
//         .get('/api/v1/record/intervention')
//         .end((err, res) => {
//           chai.request(app)
//             .patch(`/api/v1/record/intervention/1/comment`)
//             .send({'comment': 'my comment'})
//             .end((err, res) => {
//               res.should.have.status(201);
//               res.body.should.be.a('object');
//               res.body.should.have.property('message');
//               res.body.message.should.equal('Intervention comment updated successfully!');
//               done();
//             });
//         });
//     });

//     it('should return error when location field is empty', (done) => {
//       chai.request(app)
//       .get('/api/v1/record/intervention')
//         .end((err, res) => {
//           chai.request(app)
//             .patch('/api/v1/record/intervention/1/location')
//             .send({' ': ' ' })
//             .end((err, res) => {
//               res.should.have.status(400);
//               res.body.should.have.property('error').equal('location field is required');
//               done();
//             });
//         });

//     });

//     it('should return error when comment field is empty', (done) => {
//       chai.request(app)
//       .get('/api/v1/record/intervention')
//         .end((err, res) => {
//           chai.request(app)
//             .patch('/api/v1/record/intervention/1/comment')
//             .send({' ': ' '})
//             .end((err, res) => {
//               res.should.have.status(400);
//               res.body.should.have.property('error').equal('This field is required');
//               done();
//             });
//         });
//     });
//   });

//   describe('DELETE /Intervention', () => {
//     it('shoud delete intervention record from the database', (done) => {
//       chai.request(app)
//       .get('/api/v1/record/intervention')
//       .end((err, res) => {
//         chai.request(app)
//           .delete('/api/v1/record/intervention/1')
//           .end((err, res) => {
//             res.should.have.status(200);
//             res.should.be.json;
//             res.body.should.have.property('message').equal('Intervention record deleted successfully');
//             done();
//           });
//       });
//     });

//     it('should return an error if the id is not found', (done) => {
//       chai.request(app)
//         .post('/api/v1/record/intervention')
//         .end((err, res) => {
//           chai.request(app)
//           .delete('/api/v1/record/intervention/7878')
//           .end((err, res) => {
//             res.should.have.status(404);
//             res.body.should.have.property('message').equal('Intervention record not found');
//             done();
//           });
//         });
//     });
//   });