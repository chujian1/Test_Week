/**
 * Created by ypj on 18-4-25.
 */
var mongoose = require('mongoose');
var usersSchema = require('../schemas/users');

module.exports = mongoose.model('User',usersSchema);