'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var finderCtrlStub = {
  index: 'finderCtrl.index',
  show: 'finderCtrl.show',
  create: 'finderCtrl.create',
  update: 'finderCtrl.update',
  destroy: 'finderCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var finderIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './finder.controller': finderCtrlStub
});

describe('Finder API Router:', function() {

  it('should return an express router instance', function() {
    finderIndex.should.equal(routerStub);
  });

  describe('GET /api/finders', function() {

    it('should route to finder.controller.index', function() {
      routerStub.get
        .withArgs('/', 'finderCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/finders/:id', function() {

    it('should route to finder.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'finderCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/finders', function() {

    it('should route to finder.controller.create', function() {
      routerStub.post
        .withArgs('/', 'finderCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/finders/:id', function() {

    it('should route to finder.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'finderCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/finders/:id', function() {

    it('should route to finder.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'finderCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/finders/:id', function() {

    it('should route to finder.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'finderCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
