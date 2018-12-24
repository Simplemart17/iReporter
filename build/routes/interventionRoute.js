'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _intervention = require('../controllers/intervention');

var _intervention2 = _interopRequireDefault(_intervention);

var _Auth = require('../middleware/Auth');

var _Auth2 = _interopRequireDefault(_Auth);

var _validation = require('../middleware/validation');

var _validation2 = _interopRequireDefault(_validation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var intvRouter = _express2.default.Router();

intvRouter.post('/intervention', _Auth2.default.verifyToken, _validation2.default.input, _intervention2.default.createIntervention);

intvRouter.get('/intervention', _intervention2.default.getAllIntervention);

intvRouter.get('/intervention/:id', _Auth2.default.verifyToken, _intervention2.default.getIntervention);

intvRouter.patch('/intervention/:id/comment', _Auth2.default.verifyToken, _validation2.default.input, _intervention2.default.updateInterventionComment);

intvRouter.patch('/intervention/:id/location', _Auth2.default.verifyToken, _validation2.default.input, _intervention2.default.updateInterventionLocation);

intvRouter.delete('/intervention/:id', _Auth2.default.verifyToken, _intervention2.default.deleteIntervention);

exports.default = intvRouter;
//# sourceMappingURL=interventionRoute.js.map