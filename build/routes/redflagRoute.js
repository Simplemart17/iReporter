'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _red_flags = require('../controllers/red_flags');

var _red_flags2 = _interopRequireDefault(_red_flags);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var redRouter = _express2.default.Router();

redRouter.post('/red-flags', _red_flags2.default.createRedflag);

redRouter.get('/red-flags', _red_flags2.default.getAllRedflags);

redRouter.get('/red-flags/:id', _red_flags2.default.getRedflag);

redRouter.patch('/red-flags/:id/comment', _red_flags2.default.updateRedflagComment);

redRouter.patch('/red-flags/:id/location', _red_flags2.default.updateRedflagLocation);

redRouter.delete('/red-flags/:id', _red_flags2.default.deleteRedflag);

exports.default = redRouter;
//# sourceMappingURL=redflagRoute.js.map