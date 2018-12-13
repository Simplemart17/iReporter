'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _redflagRoute = require('./routes/redflagRoute');

var _redflagRoute2 = _interopRequireDefault(_redflagRoute);

var _interventionRoute = require('./routes/interventionRoute');

var _interventionRoute2 = _interopRequireDefault(_interventionRoute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();
var app = (0, _express2.default)();

var port = process.env.PORT || 5000;

app.set('appVersion', '/api/v1/record');
app.use((0, _cors2.default)());
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(app.get('appVersion'), _redflagRoute2.default);
app.use(app.get('appVersion'), _interventionRoute2.default);
// app.use('/auth', users);
app.get('*', function (req, res) {
  res.status(404).json({ error: 'The page cannot be found!' });
});

app.listen(port, function () {
  return console.log('Server started on port ' + port);
});

exports.default = app;
//# sourceMappingURL=app.js.map