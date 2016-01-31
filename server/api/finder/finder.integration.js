'use strict';

var app = require('../..');
import request from 'supertest';

var newFinder;

describe('Finder API:', function() {

  describe('GET /api/finders', function() {
    var finders;

    beforeEach(function(done) {
      request(app)
        .get('/api/finders')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          finders = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      finders.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/finders', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/finders')
        .send({
          name: 'New Finder',
          info: 'This is the brand new finder!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newFinder = res.body;
          done();
        });
    });

    it('should respond with the newly created finder', function() {
      newFinder.name.should.equal('New Finder');
      newFinder.info.should.equal('This is the brand new finder!!!');
    });

  });

  describe('GET /api/finders/:id', function() {
    var finder;

    beforeEach(function(done) {
      request(app)
        .get('/api/finders/' + newFinder._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          finder = res.body;
          done();
        });
    });

    afterEach(function() {
      finder = {};
    });

    it('should respond with the requested finder', function() {
      finder.name.should.equal('New Finder');
      finder.info.should.equal('This is the brand new finder!!!');
    });

  });

  describe('PUT /api/finders/:id', function() {
    var updatedFinder;

    beforeEach(function(done) {
      request(app)
        .put('/api/finders/' + newFinder._id)
        .send({
          name: 'Updated Finder',
          info: 'This is the updated finder!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedFinder = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedFinder = {};
    });

    it('should respond with the updated finder', function() {
      updatedFinder.name.should.equal('Updated Finder');
      updatedFinder.info.should.equal('This is the updated finder!!!');
    });

  });

  describe('DELETE /api/finders/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/finders/' + newFinder._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when finder does not exist', function(done) {
      request(app)
        .delete('/api/finders/' + newFinder._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
