const chai = require("chai");
const sinon = require("sinon");
const chaiAsPromised = require("chai-as-promised");
const salesModel = require("../../../models/Sales");
const salesProductsModel = require("../../../models/SalesProducts");
const salesService = require("../../../services/salesService");

chai.use(chaiAsPromised);

describe("services/salesService", () => {
  beforeEach(sinon.restore);
  describe("getAll", () => {
    it("should throw if model throws", () => {
      sinon.stub(salesModel, "getAll").rejects();
      return chai.expect(salesService.getAll()).to.eventually.be.rejected;
    });

    it("should return data if model returns data", () => {
      const mockedData = [{ id: 1, name: "test" }];
      sinon.stub(salesModel, "getAll").resolves(mockedData);
      return chai
        .expect(salesService.getAll())
        .to.eventually.deep.equal(mockedData);
    });
  });

  describe("getById", () => {
    it("should throw if model throws", async () => {
      sinon.stub(salesModel, "getById").rejects();
      return chai.expect(salesService.getById(1)).to.eventually.be.rejected;
    });

    it("should throw if model returns no data", async () => {
      sinon.stub(salesModel, "getById").resolves();
      return chai.expect(salesService.getById(1)).to.eventually.be.rejected;
    });

    it("should throw if model returns an empty array", async () => {
      sinon.stub(salesModel, "getById").resolves([]);
      return chai.expect(salesService.getById(1)).to.eventually.be.rejected;
    });

    it("should return data if model returns data", async () => {
      const mockedData = [{ id: 1, name: "test" }];
      sinon.stub(salesModel, "getById").resolves(mockedData);
      return chai
        .expect(salesService.getById(1))
        .to.eventually.deep.equal(mockedData);
    });
  });

  describe("create", () => {
    it("should throw if salesModel throws", async () => {
      sinon.stub(salesModel, "create").rejects();
      sinon.stub(salesProductsModel, "create").resolves();
      return chai.expect(salesService.create("test")).to.eventually.be
        .rejected;
    });

    it("should throw if salesProductsModel throws", async () => {
      sinon.stub(salesModel, "create").resolves();
      sinon.stub(salesProductsModel, "create").rejects();
      return chai.expect(salesService.create("test")).to.eventually.be.rejected;
    });

    it("should return id if model returns id", async () => {
      const mockedId = 1;
      const mockedSale = [
        {
          productId: 1,
          quantity: 1,
        },
        {
          productId: 2,
          quantity: 5,
        },
      ];
      sinon.stub(salesModel, "create").resolves(mockedId);
      sinon.stub(salesProductsModel, "create").resolves();
      return chai
        .expect(salesService.create(mockedSale))
        .to.eventually.equal(mockedId);
    });
  });

  describe("delete", () => {
    it("should throw if model throws", async () => {
      sinon.stub(salesModel, "delete").rejects();
      return chai.expect(salesService.delete(1)).to.eventually.be.rejected;
    });

    it("should be fulfilled if model is fulfilled", async () => {
      sinon.stub(salesModel, "delete").resolves();
      return chai.expect(salesService.delete(1)).to.eventually.be.fulfilled;
    });
  });
});
