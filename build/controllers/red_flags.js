"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dbase = require("../dataStructure/dbase");

var _dbase2 = _interopRequireDefault(_dbase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RedflagController = function () {
  function RedflagController() {
    _classCallCheck(this, RedflagController);
  }

  _createClass(RedflagController, [{
    key: "getAllRedflags",
    value: function getAllRedflags(req, res) {
      return res.status(200).json({ message: "red-flags retrieved successfully",
        status: 200,
        data: _dbase2.default
      });
    }
  }, {
    key: "getRedflag",
    value: function getRedflag(req, res) {
      var id = parseInt(req.params.id, 10);
      _dbase2.default.map(function (data) {
        if (data.id === id) {
          return res.status(200).json({ message: "Red-flag record retrieved successfully",
            status: 200,
            data: data
          });
        }
      });
      return res.status(404).json({ error: "The red-flag record does not exist",
        status: 404
      });
    }
  }, {
    key: "createRedflag",
    value: function createRedflag(req, res) {
      if (!req.body.title) {
        return res.status(422).json({ error: "Title field is required!",
          status: 422
        });
      } else if (!req.body.type) {
        return res.status(422).json({ error: "Type field is required!",
          status: 422
        });
      } else if (!req.body.location) {
        return res.status(422).json({ error: "Location field is required!",
          status: 422
        });
      } else if (!req.body.comment) {
        return res.status(422).json({ error: "Comment field is required!",
          status: 422
        });
      } else {
        var data = {
          id: _dbase2.default.length + 1,
          title: req.body.title,
          type: req.body.type,
          location: req.body.location,
          Images: req.body.Images,
          Videos: req.body.Videos,
          comment: req.body.comment
        };
        _dbase2.default.push(data);
        return res.status(201).json({ message: "The red-flag record added successfully",
          status: 201,
          data: data
        });
      }
    }
  }, {
    key: "updateRedflagComment",
    value: function updateRedflagComment(req, res) {
      var id = parseInt(req.params.id, 10);
      var foundDbase = void 0;
      var itemIndex = void 0;
      _dbase2.default.map(function (data, index) {
        if (data.id === id) {
          foundDbase = data;
          itemIndex = index;
        }
      });

      if (!foundDbase) {
        return res.status(404).json({ error: "The record is not found!",
          status: 404
        });
      }

      if (!req.body.comment) {
        return res.status(400).json({
          error: "This field is required",
          status: 400
        });
      } else {
        var newData = {
          id: foundDbase.id,
          title: foundDbase.title,
          type: foundDbase.type,
          location: foundDbase.location,
          Images: req.body.Images,
          Videos: req.body.Videos,
          comment: req.body.comment || foundDbase.comment
        };

        _dbase2.default.splice(itemIndex, 1, newData);

        return res.status(201).json({
          message: "Red-flag record was updated successfully",
          status: 201,
          newData: newData
        });
      }
    }
  }, {
    key: "updateRedflagLocation",
    value: function updateRedflagLocation(req, res) {
      var id = parseInt(req.params.id, 10);
      var foundDbase = void 0;
      var itemIndex = void 0;
      _dbase2.default.map(function (data, index) {
        if (data.id === id) {
          foundDbase = data;
          itemIndex = index;
        }
      });

      if (!foundDbase) {
        return res.status(404).json({ error: "The record is not found!",
          status: 404
        });
      }

      if (!req.body.location) {
        return res.status(400).json({
          error: "location field is required",
          status: 400
        });
      } else {
        var newData = {
          id: foundDbase.id,
          title: foundDbase.title,
          type: foundDbase.type,
          location: req.body.location || foundDbase.location,
          Images: req.body.Images,
          Videos: req.body.Videos,
          comment: foundDbase.comment
        };

        _dbase2.default.splice(itemIndex, 1, newData);

        return res.status(201).json({
          message: "Red-flag record was updated successfully",
          status: 201,
          newData: newData
        });
      }
    }
  }, {
    key: "deleteRedflag",
    value: function deleteRedflag(req, res) {
      var id = parseInt(req.params.id, 10);
      var foundDbase = void 0;
      var itemIndex = void 0;
      _dbase2.default.map(function (data, index) {
        if (data.id === id) {
          foundDbase = data;
          itemIndex = index;
        }
      });

      if (!foundDbase) {
        return res.status(404).json({
          error: "The record is not found!",
          status: 404
        });
      }
      _dbase2.default.splice(itemIndex, 1);

      return res.status(200).json({
        message: "The record deleted successfully",
        status: 200
      });
    }
  }]);

  return RedflagController;
}();

var redFlags = new RedflagController();
exports.default = redFlags;
//# sourceMappingURL=red_flags.js.map