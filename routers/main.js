/**
 * Created by ypj on 18-4-25.
 */
var express = require('express');
var router = express.Router();
var Content = require('../models/Content');

/*-----------首页----------------*/
router.get('/',(req,res,next)=>{

    var data = {
        userInfo:req.userInfo,
        page : Number(req.query.page || 1),
         limit : 10,
         pages : 0,
        count:0
    }

    Content.count().then(function(count) {
        data.count = count;
        data.pages = Math.ceil(data.count / data.limit);
        data.page = Math.min( data.page, data.pages );
        data.page = Math.max( data.page, 1 );
        var skip = (data.page - 1) * data.limit;
        Content.find().limit(data.limit).skip(skip).then(function(contents) {
            data.contents = contents;
            res.render('main/index',data);
        });

    });



});


module.exports = router;