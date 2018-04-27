/**
 * Created by ypj on 18-4-25.
 */
var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Content = require('../models/Content');

router.use((req,res,next)=>{
    if(!req.userInfo.isAdmin){
        res.send("只有管理员才能进入的管理的界面");
        return;
    }
    next();
});

router.get('/',(req,res,next)=>{
    res.render('admin/index',{
        userInfo:req.userInfo
    })
});

router.get('/user',(req,res)=>{

    var page = Number(req.query.page || 1);
    var limit = 10;
    var pages = 0;

    User.count().then((count)=>{

        pages = Math.ceil(count/limit);
        page = Math.min(page,pages);
        page = Math.max(page,1);
        var skip = (page-1) * limit;

        User.find().limit(limit).skip(skip).then((users)=>{
            res.render('admin/user_index',{
                userInfo:req.userInfo,
                users:users,

                count:count,
                pages:pages,
                page:page,
                limit:limit
            })
        })
    })

});

/*-------------content展示------------------*/
router.get('/content', function(req, res) {

    var page = Number(req.query.page || 1);
    var limit = 10;
    var pages = 0;

    Content.count().then(function(count) {

        pages = Math.ceil(count / limit);
        page = Math.min( page, pages );
        page = Math.max( page, 1 );
        var skip = (page - 1) * limit;
        Content.find().limit(limit).skip(skip).then(function(contents) {
            res.render('admin/content_index', {
                userInfo: req.userInfo,
                contents: contents,

                count: count,
                pages: pages,
                limit: limit,
                page: page
            });
        });

    });

});

/*---------------content增加-------------*/
router.get('/content/add',(req,res)=>{
    res.render('admin/content_add',{
        userInfo:req.userInfo
    })
});
/*----------content增加请求-----------*/
router.post('/content/add',(req,res)=>{
        if(req.body.title == ''){
            res.render('admin/error',{
                userInfo:req.userInfo,
                message:"标题不能为空"
            })
            return;
        }

        new Content({
            title:req.body.title,
            user:req.userInfo._id.toString(),
            content:req.body.content
        }).save().then((result)=>{
            res.render('admin/success',{
                userInfo:req.userInfo,
                message:"添加成功",
                url:'/admin/content'
            })
            })

});
/*-------content修改----------*/
router.get('/content/edit',(req,res)=>{
   var id = req.query.id || '' ;

   Content.findOne({
       _id:id
   }).then((content)=>{
        if(!content){
            res.render('admin/error',{
                userInfo:req.userInfo,
                message:"指定内容不存在"
            });
            return Promise.reject();
        }
        else {
            res.render('admin/content_edit', {
                userInfo: req.userInfo,
                content: content
            })
        }
   })
});
/*-------------content保存修改内容---------------*/
router.post('/content/edit',(req,res)=>{
    var id = req.query.id || '' ;

    if(req.body.title == ''){
        res.render('admin/error',{
            userInfo:req.userInfo,
            message:"标题不能为空"
        });
        return;
    }

    if(req.body.content == ''){
        res.render('admin/error',{
            userInfo:req.userInfo,
            message:"内容不能为空"
        });
        return;
    }

    Content.update({
        _id:id
    },{
        title:req.body.title,
        content:req.body.content
    }).then(()=>{
       res.render('admin/success',{
            userInfo:req.userInfo,
           message:"修改成功",
           url:'/admin/content/edit?id=' + id
       })
    })
});

/*----------content删除--------------*/
router.get('/content/delete',(req,res)=>{
    var id = req.query.id || '';

    Content.remove({
        _id:id
    }).then(()=>[
        res.render('admin/success',{
            userInfo:req.userInfo,
            message:"删除成功",
            url:'/admin/content'
        })
    ])
})

module.exports = router;