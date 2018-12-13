'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _red_flags = require('../controllers/red_flags');

var _red_flags2 = _interopRequireDefault(_red_flags);

var _dbaseSchema = require('../models/dbaseSchema');

var _dbaseSchema2 = _interopRequireDefault(_dbaseSchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var should = _chai2.default.should();

_chai2.default.use(_chaiHttp2.default);

describe('Redflags /GET', function () {
  it('should GET all the records', function (done) {
    _chai2.default.request(_app2.default).get('/api/v1/record/red-flags').end(function (err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('message').equal('Redflags records retrieved');
      done();
    });
  });
});

describe('Redflags /GET/:id', function () {
  it('should GET a redflag record by its id', function (done) {
    _chai2.default.request(_app2.default).get('/api/v1/record/red-flags/:id').end(function (err, res) {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('data');
      res.body.should.have.property('message').equal('Red-flag record retrieved successfully');
      done();
    });
  });

  it('returns status 404 when id is not found', function (done) {
    var records = {
      id: 'Not present'
    };
    _chai2.default.request(_app2.default).get('/api/v1/record/red-flags' + records.id).end(function (err, res) {
      res.should.have.status(404);
      done();
    });
  });
});

describe('Redflags /POST', function () {
  it('should add a new redflag record', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/record/red-flags').send({
      'title': 'title',
      'createdBy': 'segun',
      'type': 'redflag',
      'location': '102, 111',
      'status': 'under investigation',
      'Images': ' ',
      'Video': ' ',
      'comment': 'New comment'
    }).end(function (err, res) {
      res.should.have.status(201);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('data');
      res.body.data.should.be.a('object');
      res.body.data.should.have.property('title');
      res.body.data.title.should.equal('title');
      res.body.data.should.have.property('createdBy');
      res.body.data.createdBy.should.equal('James');
      res.body.data.should.have.property('type');
      res.body.data.type.should.equal('redflag');
      res.body.data.should.have.property('location');
      res.body.data.location.should.equal('102, 111');
      res.body.data.should.have.property('comment');
      res.body.data.comment.should.equal('New comment');
      done();
    });
  });

  it('should return error when any of the field is empty', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/record/red-flags').send({
      ' ': ' '
    }).end(function (err, res) {
      res.should.have.status(400);
      res.should.be.json;
      res.body.should.have.property('error').equal('All fields are required!');
      done();
    });
  });
});

describe('Redflag /PATCH', function () {
  it('should update location of a redflag record', function (done) {
    var records = {
      id: id
    };
    _chai2.default.request(_app2.default).get('/api/v1/record/red-flags').end(function (err, res) {
      _chai2.default.request(_app2.default).patch('/api/v1/record/red-flags/' + id + '/location').send({ 'location': '92, 113' }).end(function (err, res) {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('newData');
        res.body.newData.should.be.a('object');
        res.body.newData.should.have.property('location');
        res.body.newData.location.should.equal('92, 113');
        done();
      });
    });
  });

  it('should update comment of a redflag record', function (done) {
    var records = {
      id: id
    };
    _chai2.default.request(_app2.default).get('/api/v1/record/record/red-flags').end(function (err, res) {
      _chai2.default.request(_app2.default).patch('/api/v1/record/red-flags/' + id + '/comment').send({ 'comment': 'new comment' }).end(function (err, res) {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('newData');
        res.body.newData.should.have.property('comment');
        res.body.newData.comment.should.equal('new comment');
        done();
      });
    });
  });

  it('should return error when location field is empty', function (done) {
    _chai2.default.request(_app2.default).get('/api/v1/record/location/red-flags').end(function (err, res) {
      _chai2.default.request(_app2.default).patch('/api/v1/record/red-flags/1/location').send({ ' ': ' ' }).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.have.property('error').equal('location field is required');
        done();
      });
    });
  });

  it('should return error when comment field is empty', function (done) {
    _chai2.default.request(_app2.default).get('/api/v1/record/location/red-flags').end(function (err, res) {
      _chai2.default.request(_app2.default).patch('/api/v1/record/red-flags/1/comment').send({ ' ': ' ' }).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.have.property('error').equal('This field is required');
        done();
      });
    });
  });
});

describe('Redflag /DELETE', function () {
  it('shoud delete the record from the database', function (done) {
    var records = {
      id: id
    };
    _chai2.default.request(_app2.default).get('/api/v1/record/red-flags').end(function (err, res) {
      _chai2.default.request(_app2.default).delete('/api/v1/record/red-flags/' + id).end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.have.property('message').equal('The record deleted successfully');
        done();
      });
    });
  });

  it('should return an error if the id is not found', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/record/red-flags').end(function (err, res) {
      _chai2.default.request(_app2.default).delete('/api/v1/record/red-flags').end(function (err, res) {
        res.should.have.status(404);
        done();
      });
    });
  });
});
//# sourceMappingURL=test.js.map