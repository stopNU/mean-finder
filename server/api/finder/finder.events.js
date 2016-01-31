/**
 * Finder model events
 */

'use strict';

import {EventEmitter} from 'events';
var Finder = require('./finder.model');
var FinderEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
FinderEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Finder.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    FinderEvents.emit(event + ':' + doc._id, doc);
    FinderEvents.emit(event, doc);
  }
}

export default FinderEvents;
