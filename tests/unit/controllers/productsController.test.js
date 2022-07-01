const chai = require("chai");
const sinon = require("sinon");
const chaiAsPromised = require("chai-as-promised");
const productsController = require("../../../controllers/productsController");
const productsService = require("../../../services/productsService");

chai.use(chaiAsPromised);

describe('controllers/productsController', () => {
  let req = {};
  let res = {};

  beforeEach(() => {
    req = {};
    res = {};
    sinon.restore();
  });

  describe('getAll', () => {
    it('should throw if services throws', async () => {
      sinon.stub(productsService, "getAll").rejects();
      return chai.expect(productsController.getAll()).to.eventually.be.rejected;
    });

    it('should return code 200', async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();
      const mockedData = [
        { id: 1, name: "test" },
        { id: 2, name: "test2" },
      ];

      sinon.stub(productsService, "getAll").resolves(mockedData);
      await productsController.getAll(req, res);
      chai.expect(res.status.calledWith(200)).to.be.true;
    });

    it("should return all products", async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();
      const mockedData = [
        { id: 1, name: "test" },
        { id: 2, name: "test2" },
      ];

      sinon.stub(productsService, "getAll").resolves(mockedData);
      await productsController.getAll(req, res);
      chai.expect(res.json.calledWith(mockedData)).to.be.true;
    });
  });

  describe('getById', () => {
    it('should throw if services throws', async () => {
      sinon.stub(productsService, "getById").rejects();
      return chai.expect(productsController.getById()).to.eventually.be
        .rejected;
    });

    it("should return code 200", async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();
      req.params = { id: 1 };
      const mockedData = { id: 1, name: "test" };

      sinon.stub(productsService, "getById").resolves(mockedData);
      await productsController.getById(req, res);
      chai.expect(res.status.calledWith(200)).to.be.true;
    });

    it("should return only one product", async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();
      req.params = { id: 1 };
      const mockedData = { id: 1, name: "test" };

      sinon.stub(productsService, "getById").resolves(mockedData);
      await productsController.getById(req, res);
      chai.expect(res.json.calledWith(mockedData)).to.be.true;
    });
  });

  describe('create', () => {
    it('should throw if services.checkIfExists throws', async () => {
      sinon.stub(productsService, "checkIfExists").rejects();
      sinon.stub(productsService, "create").resolves();
      sinon.stub(productsService, "getById").resolves();
      return chai.expect(productsController.create()).to.eventually.be.rejected;
    });

    it("should throw if services.create throws", async () => {
      sinon.stub(productsService, "checkIfExists").resolves();
      sinon.stub(productsService, "create").rejects();
      sinon.stub(productsService, "getById").resolves();
      return chai.expect(productsController.create()).to.eventually.be.rejected;
    });

    it("should throw if services.getById throws", async () => {
      sinon.stub(productsService, "checkIfExists").resolves();
      sinon.stub(productsService, "create").resolves();
      sinon.stub(productsService, "getById").rejects();
      return chai.expect(productsController.create()).to.eventually.be.rejected;
    });

    it("should return code 201", async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();
      req.body = { name: "test" };
      const mockedData = { id: 1, ...req.body };

      sinon.stub(productsService, "checkIfExists").resolves(false);
      sinon.stub(productsService, "create").resolves(1);
      sinon.stub(productsService, "getById").resolves(mockedData);
      await productsController.create(req, res);
      chai.expect(res.status.calledWith(201)).to.be.true;
    });

    it("should return the created product", async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();
      req.body = { name: "test" };
      const mockedData = { id: 1, ...req.body };

      sinon.stub(productsService, "checkIfExists").resolves(false);
      sinon.stub(productsService, "create").resolves(1);
      sinon.stub(productsService, "getById").resolves(mockedData);
      await productsController.create(req, res);
      chai.expect(res.json.calledWith(mockedData)).to.be.true;
    });
  });
}); 
