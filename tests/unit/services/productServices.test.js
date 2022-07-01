const chai = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const productsModel = require('../../../models/Products');
const productsService = require('../../../services/productsService');

chai.use(chaiAsPromised);

describe('services/userServices', () => {
  beforeEach(sinon.restore)
  describe('getAll', () => {
    it('should throw if model throws', () => {
      sinon.stub(productsModel, "getAll").rejects();
      return chai.expect(productsService.getAll()).to.eventually.be.rejected;
    });

    it('should return data if model returns data', () => {
      const mockedData = [{ id: 1, name: "test" }];
      sinon.stub(productsModel, "getAll").resolves(mockedData);
      return chai
        .expect(productsService.getAll())
        .to.eventually.deep.equal(mockedData);
    });
  });

  describe('getById', () => {
    it('should throw if model throws', async () => {
      sinon.stub(productsModel, "getById").rejects();
      return chai.expect(productsService.getById(1)).to.eventually.be.rejected;
    });

    it('should throw if model returns no data', async () => {
      sinon.stub(productsModel, "getById").resolves();
      return chai.expect(productsService.getById(1)).to.eventually.be.rejected;
    });

    it('should return data if model returns data', async () => {
      const mockedData = { id: 1, name: "test" };
      sinon.stub(productsModel, "getById").resolves(mockedData);
      return chai.expect(productsService.getById(1)).to.eventually.deep.equal(mockedData);
    });
  });

  describe('checkIfExists', () => {
    it('should throw if model throws', async () => {
      sinon.stub(productsModel, "checkIfExists").rejects();
      return chai.expect(productsService.checkIfExists("test")).to.eventually.be.rejected;
    });

    it('should throw if model returns true', async () => {
      sinon.stub(productsModel, "checkIfExists").resolves(true);
      return chai.expect(productsService.checkIfExists("test")).to.eventually.be.rejected;
    });

    it('should be fulfilled when model returns false', async () => {
      sinon.stub(productsModel, "checkIfExists").resolves(false);
      return chai.expect(productsService.checkIfExists("test")).to.eventually.be.fulfilled;
    });
  });

  describe('create', () => {
    it('should throw if model throws', async () => {
      sinon.stub(productsModel, "create").rejects();
      return chai.expect(productsService.create("test")).to.eventually.be.rejected;
    });

    it('should return id if model returns id', async () => {
      const mockedId = 1;
      sinon.stub(productsModel, "create").resolves(mockedId);
      return chai.expect(productsService.create("test")).to.eventually.equal(mockedId);
    });
  });

  describe('update', () => {
    it('should throw if model throws', async () => {
      sinon.stub(productsModel, "update").rejects();
      const mockedParams = { id: 1, name: "test", quantity: 1 };
      const { id, name, quantity } = mockedParams;
      return chai.expect(productsService.update(id, name, quantity)).to.eventually.be.rejected;
    });

    it('should be fulfilled if model is fulfilled', async () => {
      const mockedParams = { id: 1, name: "test", quantity: 1 };
      const {id, name, quantity} = mockedParams;
      sinon.stub(productsModel, "update").resolves();
      return chai.expect(productsService.update(id, name, quantity)).to
        .eventually.be.fulfilled;
    });
  });

  describe('delete', () => {
    it('should throw if model throws', async () => {
      sinon.stub(productsModel, "delete").rejects();
      return chai.expect(productsService.delete(1)).to.eventually.be.rejected;
    });

    it('should be fulfilled if model is fulfilled', async () => {
      sinon.stub(productsModel, "delete").resolves();
      return chai.expect(productsService.delete(1)).to.eventually.be.fulfilled;
    });
  });
})