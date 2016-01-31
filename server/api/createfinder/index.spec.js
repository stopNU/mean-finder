'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var createfinderCtrlStub = {
  index: 'createfinderCtrl.index',
  show: 'createfinderCtrl.show',
  create: 'createfinderCtrl.create',
  update: 'createfinderCtrl.update',
  destroy: 'createfinderCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var createfinderIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './createfinder.controller': createfinderCtrlStub
});

describe('Createfinder API Router:', function() {

  it('should return an express router instance', function() {
    createfinderIndex.should.equal(routerStub);
  });

  describe('GET /api/createfinders', function() {

    it('should route to createfinder.controller.index', function() {
      routerStub.get
        .withArgs('/', 'createfinderCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/createfinders/:id', function() {

    it('should route to createfinder.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'createfinderCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/createfinders', function() {

    it('should route to createfinder.controller.create', function() {
      routerStub.post
        .withArgs('/', 'createfinderCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/createfinders/:id', function() {

    it('should route to createfinder.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'createfinderCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/createfinders/:id', function() {

    it('should route to createfinder.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'createfinderCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/createfinders/:id', function() {

    it('should route to createfinder.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'createfinderCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
