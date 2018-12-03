"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _dbase = require("./dataStructure/dbase");

var _dbase2 = _interopRequireDefault(_dbase);

var _redflagRoute = require("./routes/redflagRoute");

var _redflagRoute2 = _interopRequireDefault(_redflagRoute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

var port = process.env.PORT || 3000;

app.set("appData", _dbase2.default);
app.set("appVersion", "/api/v1");
app.use((0, _cors2.default)());
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(app.get("appVersion"), _redflagRoute2.default);
app.get("*", function (req, res) {
	res.status(404).json({ error: "The page cannot be found!" });
});

app.listen(port, function () {
	return console.log("Server started on port " + port);
});
//# sourceMappingURL=app.js.map