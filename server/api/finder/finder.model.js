'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose')),
Schema = mongoose.Schema;

var FinderSchema = new Schema({
  text: String,
  options: [{
  	title: String,
  	image: String,
  	_id : false
  }]
});

export default mongoose.model('Finder', FinderSchema, 'slides');
