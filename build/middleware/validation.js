'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Validation = function () {
  function Validation() {
    _classCallCheck(this, Validation);
  }

  _createClass(Validation, null, [{
    key: 'input',


    // validation for records creation
    value: function input(req, res, next) {
      var error = '';
      var whiteSpace = /^\s+$/g;
      var _req$body = req.body,
          comment = _req$body.comment,
          title = _req$body.title,
          type = _req$body.type,
          location = _req$body.location,
          isAdmin = _req$body.isAdmin;

      if (!comment || comment.match(whiteSpace)) {
        error = 'Comment field cannot be empty';
      } else if (comment.length < 20) {
        error = 'Enter detailed description of the report';
      } else if (!title || title.match(whiteSpace)) {
        error = 'Title field cannot be empty';
      } else if (!type || type === ' ') {
        error = 'Select a type of records to be submitted';
      } else if (!location || location.match(whiteSpace)) {
        error = 'Location field is important!';
      } else if (!isAdmin || isAdmin.match(whiteSpace)) {
        req.body.isAdmin = 'false';
      }
      if (error) {
        return res.status(400).json({ error: error });
      }
      return next();
    }

    // validation for users signup and signin

  }, {
    key: 'userSignUp',
    value: function userSignUp(req, res, next) {
      var error = void 0;
      var whiteSpace = /^\s+$/g;
      var numReg = new RegExp(/^\+[0-9]{13}$|^[0-9]{11}$/);
      var validEmail = new RegExp(/\S+@\S+\.\S/);
      var _req$body2 = req.body,
          firstname = _req$body2.firstname,
          lastname = _req$body2.lastname,
          othername = _req$body2.othername,
          email = _req$body2.email,
          phoneNumber = _req$body2.phoneNumber,
          username = _req$body2.username,
          password = _req$body2.password;

      if (!firstname || firstname.match(whiteSpace)) {
        error = 'Firstname field cannot be empty';
      } else if (!lastname || lastname.match(whiteSpace)) {
        error = 'Enter your lastname';
      } else if (!othername || othername.match(whiteSpace)) {
        error = 'Enter your othername';
      } else if (!phoneNumber || phoneNumber.match(whiteSpace)) {
        error = 'Phone number is required!';
      } else if (!username || username.match(whiteSpace)) {
        error = 'Username is required!';
      } else if (!password || password.match(whiteSpace)) {
        error = 'Password field cannot be empty';
      } else if (!email || email.match(whiteSpace)) {
        error = 'Email field cannot be empty';
      } else if (!phoneNumber.match(numReg)) {
        error = 'Enter phone number in the right format';
      } else if (!email.match(validEmail)) {
        error = 'Enter a valid email address!';
      }
      if (error) {
        return res.status(400).json({ error: error });
      }
      return next();
    }
  }, {
    key: 'userSignIn',
    value: function userSignIn(req, res, next) {
      var error = void 0;
      var whiteSpace = /^\s+$/g;
      var validEmail = new RegExp(/\S+@\S+\.\S/);
      var _req$body3 = req.body,
          email = _req$body3.email,
          password = _req$body3.password;

      if (!email || email.match(whiteSpace)) {
        error = 'email is required';
      } else if (!password || password.match(whiteSpace)) {
        error = 'Password field cannot be empty';
      } else if (!email.match(validEmail)) {
        error = 'Enter a valid email address!';
      }
      if (error) {
        return res.status(400).json({ error: error });
      }
      return next();
    }
  }]);

  return Validation;
}();

exports.default = Validation;
//# sourceMappingURL=validation.js.map