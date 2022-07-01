const chai = require("chai");
const sinon = require("sinon");
const chaiAsPromised = require("chai-as-promised");
const salesProductsModel = require("../../../models/SalesProducts");
const db = require("../../../models/db");
const { describe } = require("mocha");

chai.use(chaiAsPromised);

describe("models/SalesProducts", () => {
  beforeEach(sinon.restore);

  describe("create", () => {
    it("should throw if connection throws", async () => {
      sinon.stub(db, "query").rejects;
      return chai.expect(
        salesProductsModel.create(1, { productId: 2, quantity: 3 })
      ).to.eventually.be.rejected;
    });

    it("should throw if connection doesn't return insertId", async () => {
      sinon.stub(db, "query").resolves([{ invalidKey: 1 }]);
      return chai.expect(
        salesProductsModel.create(1, { productId: 2, quantity: 3 })
      ).to.eventually.be.rejected;
    });

    it("should return id if connection returns insertId", async () => {
      const mockedData = { insertId: 1 };
      const { insertId } = mockedData;
      sinon.stub(db, "query").resolves([mockedData]);
      return chai
        .expect(salesProductsModel.create(1, { productId: 2, quantity: 3 }))
        .to.eventually.equal(insertId);
    });
  });
});
