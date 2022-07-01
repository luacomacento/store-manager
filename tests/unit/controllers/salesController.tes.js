const chai = require("chai");
const sinon = require("sinon");
const chaiAsPromised = require("chai-as-promised");
const salesController = require("../../../controllers/salesController");
const salesService = require("../../../services/salesService");
const productsService = require("../../../services/productsService");

chai.use(chaiAsPromised);

describe("controllers/salesController", () => {
  let req = {};
  let res = {};

  beforeEach(() => {
    req = {};
    res = {};
    sinon.restore();
  });

  describe("getAll", () => {
    it("should throw if services throws", async () => {
      sinon.stub(salesService, "getAll").rejects();
      return chai.expect(salesController.getAll()).to.eventually.be.rejected;
    });

    it("should return code 200", async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();
      const mockedData = [
        { id: 1, name: "test" },
        { id: 2, name: "test2" },
      ];

      sinon.stub(salesService, "getAll").resolves(mockedData);
      await salesController.getAll(req, res);
      chai.expect(res.status.calledWith(200)).to.be.true;
    });

    it("should return all products", async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();
      const mockedData = [
        { id: 1, name: "test" },
        { id: 2, name: "test2" },
      ];

      sinon.stub(salesService, "getAll").resolves(mockedData);
      await salesController.getAll(req, res);
      chai.expect(res.json.calledWith(mockedData)).to.be.true;
    });
  });

  describe("getById", () => {
    it("should throw if services throws", async () => {
      sinon.stub(salesService, "getById").rejects();
      return chai.expect(salesController.getById()).to.eventually.be
        .rejected;
    });

    it("should return code 200", async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();
      req.params = { id: 1 };
      const mockedData = { id: 1, name: "test" };

      sinon.stub(salesService, "getById").resolves(mockedData);
      await salesController.getById(req, res);
      chai.expect(res.status.calledWith(200)).to.be.true;
    });

    it("should return only one product", async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();
      req.params = { id: 1 };
      const mockedData = { id: 1, name: "test" };

      sinon.stub(salesService, "getById").resolves(mockedData);
      await salesController.getById(req, res);
      chai.expect(res.json.calledWith(mockedData)).to.be.true;
    });
  });

  describe("create", () => {
    it("should throw if services.checkIfExists throws", async () => {
      sinon.stub(salesService, "create").resolves();
      sinon.stub(salesService, "getById").resolves();
      return chai.expect(salesController.create()).to.eventually.be.rejected;
    });

    it("should throw if services.create throws", async () => {
      sinon.stub(salesService, "create").rejects();
      sinon.stub(salesService, "getById").resolves();
      return chai.expect(salesController.create()).to.eventually.be.rejected;
    });

    it("should throw if services.getById throws", async () => {
      sinon.stub(salesService, "create").resolves();
      sinon.stub(salesService, "getById").rejects();
      return chai.expect(salesController.create()).to.eventually.be.rejected;
    });

    it("should return code 201", async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();
      req.body = [
        { productId: 1, quantity: 1 },
        { productId: 2, quantity: 2 },
      ];
      const mockedData = { id: 1, itemsSold: [...req.body] };

      sinon.stub(productsService, "getById").resolves();
      sinon.stub(salesService, "create").resolves(1);
      await salesController.create(req, res);
      chai.expect(res.status.calledWith(201)).to.be.true;
    });

    it("should return the created product", async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();
      req.body = [
        { productId: 1, quantity: 1 },
        { productId: 2, quantity: 2 },
      ];
      const mockedData = { id: 1, itemsSold: [...req.body] };

      sinon.stub(productsService, "getById").resolves();
      sinon.stub(salesService, "create").resolves(1);
      await salesController.create(req, res);
      chai.expect(res.json.calledWith(mockedData)).to.be.true;
    });
  });
});
