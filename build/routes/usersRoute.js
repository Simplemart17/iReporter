'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _users = require('../controllers/users');

var _users2 = _interopRequireDefault(_users);

var _validation = require('../middleware/validation');

var _validation2 = _interopRequireDefault(_validation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userRouter = _express2.default.Router();

userRouter.post('/auth/signup', _validation2.default.userSignUp, _users2.default.createUser);

userRouter.post('/auth/signin', _validation2.default.userSignIn, _users2.default.signin);

userRouter.get('/auth/users', _users2.default.getUsers);

exports.default = userRouter;
//# sourceMappingURL=usersRoute.js.map