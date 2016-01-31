/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/finders              ->  index
 * POST    /api/finders              ->  create
 * GET     /api/finders/:id          ->  show
 * PUT     /api/finders/:id          ->  update
 * DELETE  /api/finders/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
var Finder = require('./finder.model');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of Finders
export function index(req, res) {
  Finder.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Gets a single Finder from the DB
export function show(req, res) {
  Finder.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Creates a new Finder in the DB
export function create(req, res) {
  Finder.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Finder in the DB
export function update(req, res) {
  console.log("Updating");
  console.log(req.body);
  if (req.body._id) {
    delete req.body._id;
  }
  Finder.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Deletes a Finder from the DB
export function destroy(req, res) {
  Finder.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
