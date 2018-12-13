'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _intervention = require('../controllers/intervention');

var _intervention2 = _interopRequireDefault(_intervention);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var intvRouter = _express2.default.Router();

intvRouter.post('/intervention', _intervention2.default.createIntervention);

intvRouter.get('/intervention', _intervention2.default.getAllIntervention);

intvRouter.get('/intervention/:id', _intervention2.default.getIntervention);

intvRouter.patch('/intervention/:id/comment', _intervention2.default.updateInterventionComment);

intvRouter.patch('/intervention/:id/location', _intervention2.default.updateInterventionLocation);

intvRouter.delete('/intervention/:id', _intervention2.default.deleteIntervention);

exports.default = intvRouter;
//# sourceMappingURL=interventionRoute.js.map