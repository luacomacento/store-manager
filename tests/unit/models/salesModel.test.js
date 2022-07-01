const chai = require("chai");
const sinon = require("sinon");
const chaiAsPromised = require("chai-as-promised");
const salesModel = require("../../../models/Sales");
const db = require("../../../models/db");
const { describe } = require("mocha");

chai.use(chaiAsPromised);

describe("models/Sales", () => {
  beforeEach(sinon.restore);

  describe("getAll", () => {
    it("should throw if connection throws", () => {
      sinon.stub(db, "query").rejects;
      return chai.expect(salesModel.getAll()).to.eventually.be.rejected;
    });

    it("should throw if connection returns no data", async () => {
       sinon.stub(db, "query").resolves();
       return chai.expect(salesModel.getAll()).to.eventually.be.rejected;
    });

    it("should return data if connection returns data", () => {
      const mockedData = { id: 1, name: "test" };
      sinon.stub(db, "query").resolves([mockedData]);
      return chai
        .expect(salesModel.getAll())
        .to.eventually.deep.equal(mockedData);
    });
  });

  describe("getById", () => {
    it("should throw if connection throws", () => {
      sinon.stub(db, "query").rejects;
      return chai.expect(salesModel.getById(1)).to.eventually.be.rejected;
    });

    it("should throw if connection returns no data", async () => {
      sinon.stub(db, "query").resolves();
      return chai.expect(salesModel.getById(1)).to.eventually.be.rejected;
    });

    it("should return data if connection returns data", () => {
      const mockedData = { id: 1, name: "test" };
      sinon.stub(db, "query").resolves([mockedData]);
      return chai
        .expect(salesModel.getById(1))
        .to.eventually.deep.equal(mockedData);
    });
  });

  describe("create", () => {
    it("should throw if connection throws", async () => {
      sinon.stub(db, "query").rejects;
      return chai.expect(salesModel.create("test")).to.eventually.be
        .rejected;
    });

    it("should throw if connection doesn't return insertId", async () => {
      sinon.stub(db, "query").resolves([{ invalidKey: 1 }]);
      return chai.expect(salesModel.create("test")).to.eventually.be
        .rejected;
    });

    it("should return id if connection returns insertId", async () => {
      const mockedData = { insertId: 1 };
      const { insertId } = mockedData;
      sinon.stub(db, "query").resolves([mockedData]);
      return chai
        .expect(salesModel.create("test"))
        .to.eventually.equal(insertId);
    });
  });

  describe("delete", () => {
    it("should throw if connection throws", async () => {
      sinon.stub(db, "query").rejects;
      return chai.expect(salesModel.delete(1)).to.eventually.be.rejected;
    });

    it("should return false if connection doesn't return affectedRows", async () => {
      sinon.stub(db, "query").resolves([{ affectedRows: 0 }]);
      return chai.expect(salesModel.delete(1)).to.eventually.be.equal(false);
    });

    it("should return true if connection returns affectedRows", async () => {
      sinon.stub(db, "query").resolves([{ affectedRows: 1 }]);
      return chai.expect(salesModel.delete(1)).to.eventually.be.equal(true);
    });
  });
});
