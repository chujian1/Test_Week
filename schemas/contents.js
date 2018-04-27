/**
 * Created by ypj on 18-4-26.
 */
var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
   title:String,
    addTime:{
       type:Date,
        default:new Date()
    },
    views:{
       type:Number,
        default:0
    },
    content:{
       type:String,
        default:''
    }
});