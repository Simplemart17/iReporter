import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app";
const should = chai.should();

chai.use(chaiHttp);


describe("Redflags", () => {
  it("should GET all the records", (done) => {
      chai.request(app)
        .get("/api/v1/record/red-flags")
        .end((err, res) => {
          res.should.have.status(200);
        done();
        });
    });
  });