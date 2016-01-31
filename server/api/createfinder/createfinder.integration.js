'use strict';

var app = require('../..');
import request from 'supertest';

var newCreatefinder;

describe('Createfinder API:', function() {

  describe('GET /api/createfinders', function() {
    var createfinders;

    beforeEach(function(done) {
      request(app)
        .get('/api/createfinders')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          createfinders = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      createfinders.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/createfinders', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/createfinders')
        .send({
          name: 'New Createfinder',
          info: 'This is the brand new createfinder!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newCreatefinder = res.body;
          done();
        });
    });

    it('should respond with the newly created createfinder', function() {
      newCreatefinder.name.should.equal('New Createfinder');
      newCreatefinder.info.should.equal('This is the brand new createfinder!!!');
    });

  });

  describe('GET /api/createfinders/:id', function() {
    var createfinder;

    beforeEach(function(done) {
      request(app)
        .get('/api/createfinders/' + newCreatefinder._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          createfinder = res.body;
          done();
        });
    });

    afterEach(function() {
      createfinder = {};
    });

    it('should respond with the requested createfinder', function() {
      createfinder.name.should.equal('New Createfinder');
      createfinder.info.should.equal('This is the brand new createfinder!!!');
    });

  });

  describe('PUT /api/createfinders/:id', function() {
    var updatedCreatefinder;

    beforeEach(function(done) {
      request(app)
        .put('/api/createfinders/' + newCreatefinder._id)
        .send({
          name: 'Updated Createfinder',
          info: 'This is the updated createfinder!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedCreatefinder = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCreatefinder = {};
    });

    it('should respond with the updated createfinder', function() {
      updatedCreatefinder.name.should.equal('Updated Createfinder');
      updatedCreatefinder.info.should.equal('This is the updated createfinder!!!');
    });

  });

  describe('DELETE /api/createfinders/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/createfinders/' + newCreatefinder._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when createfinder does not exist', function(done) {
      request(app)
        .delete('/api/createfinders/' + newCreatefinder._id)
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
