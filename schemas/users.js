/**
 * Created by ypj on 18-4-25.
 */
var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    username:String ,
    password:String,
    isAdmin:{
        type:Boolean    ,
        default:false
    }

});