/**
 * Created by ypj on 18-4-26.
 */
var mongoose = require('mongoose');
var contentsSchema = require('../schemas/contents');

module.exports = mongoose.model('Content',contentsSchema);