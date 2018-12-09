import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app";
import dbase from "../dataStructure/dbase";
const should = chai.should();

chai.use(chaiHttp);


describe("Redflags /GET", () => {
  it("should GET all the records", (done) => {
      chai.request(app)
        .get("/api/v1/record/red-flags")
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a("object");
          res.body.should.have.property("message").equal("red-flags retrieved successfully");
        done();
        });
    });
  });

  describe("Redflags /GET/:id", () => {
    it("should GET a redflag record by its id", (done) => {
      chai.request(app)
          .get("/api/v1/record/red-flags/1")
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("data");
            res.body.should.have.property("message").equal("Red-flag record retrieved successfully");
            done();
          });
      });

      it("returns status 404 when id is not found", (done) => {
        const data = {
          id: "Not present"
        }
        chai.request(app)
          .get("/api/v1/record/red-flags" + data.id)
          .end((err, res) => {
          res.should.have.status(404);
          done();
        });
      });
  });

  describe("Redflags /POST", () => {
    it("should add a new redflag record", (done) => {
      chai.request(app)
        .post("/api/v1/record/red-flags")
        .send({
          "title": "title",
          "createdBy": "James",
          "type": "redflag",
          "location": "102, 111",
          "comment": "New comment"
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a("object");
          res.body.should.have.property("data");
          res.body.data.should.be.a("object");
          res.body.data.should.have.property("title");
          res.body.data.title.should.equal("title");
          res.body.data.should.have.property("createdBy");
          res.body.data.createdBy.should.equal("James");
          res.body.data.should.have.property("type");
          res.body.data.type.should.equal("redflag");
          res.body.data.should.have.property("location");
          res.body.data.location.should.equal("102, 111");
          res.body.data.should.have.property("comment");
          res.body.data.comment.should.equal("New comment");
          done();
        });
    }); 

    it("should return error when any of the field is empty", (done) => {
      chai.request(app)
      .post("/api/v1/record/red-flags")
        .send({
          " ": " "
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.should.be.json;
          res.body.should.have.property("error").equal("All fields are required!");
          done();
        });
    });
  });

  describe("Redflag /PATCH", () => {
    it("should update location of a redflag record", (done) => {
      chai.request(app)
        .get("/api/v1/record/red-flags")
        .end((err, res) => {
          chai.request(app)
            .patch("/api/v1/record/red-flags/1/location")
            .send({"location": "92, 113"})
            .end((err, res) => {
              res.should.have.status(201);
              res.should.be.json;
              res.body.should.be.a("object");
              res.body.should.have.property("newData");
              res.body.newData.should.be.a("object");
              res.body.newData.should.have.property("location");
              res.body.newData.location.should.equal("92, 113");
              done();
            });
        });
    });

    it("should update comment of a redflag record", (done) => {
      chai.request(app)
        .get("/api/v1/record/record/red-flags")
        .end((err, res) => {
          chai.request(app)
            .patch("/api/v1/record/red-flags/1/comment")
            .send({"comment": "new comment"})
            .end((err, res) => {
              res.should.have.status(201);
              res.body.should.be.a("object");
              res.body.should.have.property("newData");
              res.body.newData.should.have.property("comment");
              res.body.newData.comment.should.equal("new comment");
              done();
            });
        });
    });

    it("should return error when location field is empty", (done) => {
      chai.request(app)
      .get("/api/v1/record/location/red-flags")
        .end((err, res) => {
          chai.request(app)
            .patch("/api/v1/record/red-flags/1/location")
            .send({" ": ""})
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.have.property("error").equal("location field is required");
              done();
            });
        });

    });

    it("should return error when comment field is empty", (done) => {
      chai.request(app)
      .get("/api/v1/record/location/red-flags")
        .end((err, res) => {
          chai.request(app)
            .patch("/api/v1/record/red-flags/1/comment")
            .send({" ": ""})
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.have.property("error").equal("This field is required");
              done();
            });
        });
    });
  });

  describe("Redflag /DELETE", () => {
    it("shoud delete the record from the database", (done) => {
      chai.request(app)
      .get("/api/v1/record/red-flags")
      .end((err, res) => {
        chai.request(app)
          .delete("/api/v1/record/red-flags/1")
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.have.property("message").equal("The record deleted successfully");
            done();
          });
      });
    });

    it("should return an error if the id is not found", (done) => {
      chai.request(app)
        .post("/api/v1/record/red-flags")
        .end((err, res) => {
          chai.request(app)
          .delete("/api/v1/record/red-flags")
          .end((err, res) => {
            res.should.have.status(404);
            done();
          });
        });
    });
  }); 