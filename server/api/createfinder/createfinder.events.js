/**
 * Createfinder model events
 */

'use strict';

import {EventEmitter} from 'events';
var Createfinder = require('./createfinder.model');
var CreatefinderEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CreatefinderEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Createfinder.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    CreatefinderEvents.emit(event + ':' + doc._id, doc);
    CreatefinderEvents.emit(event, doc);
  }
}

export default CreatefinderEvents;
