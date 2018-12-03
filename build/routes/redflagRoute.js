"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _red_flags = require("../controllers/red_flags");

var _red_flags2 = _interopRequireDefault(_red_flags);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get("/red-flags", _red_flags2.default.getAllRedflags);

router.get("/red-flags/:id", _red_flags2.default.getRedflag);

router.post("/red-flags", _red_flags2.default.createRedflag);

router.patch("/red-flags/:id", _red_flags2.default.updateRedflag);

router.delete("/red-flags/:id", _red_flags2.default.deleteRedflag);

exports.default = router;
//# sourceMappingURL=redflagRoute.js.map