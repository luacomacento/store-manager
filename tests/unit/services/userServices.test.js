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
      chai.expect(productsService.getAll()).to.eventually.be.rejected;
    });

    it('should return data if model returns data', () => {
      const mockedData = [{ id: 1, name: "test" }];
      sinon.stub(productsModel, "getAll").resolves(mockedData);
      chai
        .expect(productsService.getAll())
        .to.eventually.deep.equal(mockedData);
    });
  });

  describe('getById', () => {
    it('should throw if model throws', async () => {
      sinon.stub(productsModel, "getById").rejects();
      chai.expect(productsService.getById(1)).to.eventually.be.rejected;
    });

    it('should throw if model returns no data', async () => {
      sinon.stub(productsModel, "getById").resolves({ id: 1, name: "test" });
      chai.expect(productsService.getById(1)).to.eventually.be.rejected;
    });

    it('should return data if model returns data', async () => {
      const mockedData = { id: 1, name: "test" };
      sinon.stub(productsModel, "getById").resolves(mockedData);
      const result = await productsService.getById(1);
      chai.expect(result).to.deep.equal(mockedData);
    });
  });
})