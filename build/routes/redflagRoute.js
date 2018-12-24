'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _red_flags = require('../controllers/red_flags');

var _red_flags2 = _interopRequireDefault(_red_flags);

var _Auth = require('../middleware/Auth');

var _Auth2 = _interopRequireDefault(_Auth);

var _validation = require('../middleware/validation');

var _validation2 = _interopRequireDefault(_validation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var redRouter = _express2.default.Router();

redRouter.post('/red-flags', _Auth2.default.verifyToken, _validation2.default.input, _red_flags2.default.createRedflag);

redRouter.get('/red-flags', _red_flags2.default.getAllRedflags);

redRouter.get('/red-flags/:id', _Auth2.default.verifyToken, _red_flags2.default.getRedflag);

redRouter.patch('/red-flags/:id/comment', _Auth2.default.verifyToken, _validation2.default.input, _red_flags2.default.updateRedflagComment);

redRouter.patch('/red-flags/:id/location', _Auth2.default.verifyToken, _validation2.default.input, _red_flags2.default.updateRedflagLocation);

redRouter.delete('/red-flags/:id', _Auth2.default.verifyToken, _red_flags2.default.deleteRedflag);

exports.default = redRouter;
//# sourceMappingURL=redflagRoute.js.map