/**
 * Created by ypj on 18-4-25.
 */
var express = require('express');
var router = express.Router();
var User = require('../models/User');

var responseData;
router.use((req,res,next)=>{
    responseData = {
        code:0,
        message:''
    }
    next();
})

router.post('/user/register',(req,res,next)=>{
    var username = req.body.username;
    var password = req.body.password;
    var repassword = req.body.repassword;

    if(username == ''){
        responseData.code = 1;
        responseData.message = "用户名不能为空";
        res.json(responseData);
        return;
    }
    if(password == ''){
        responseData.code = 2;
        responseData.message = "密码不能为空";
        res.json(responseData);
        return;
    }
    if(password != repassword ){
        responseData.code = 3;
        responseData.message = "两次密码输入不一致";
        res.json(responseData);
        return;
    }
    User.findOne({
        username : username
    }).then((userInfo)=>{
        if(userInfo){
            responseData.code = 4;
            responseData.message = "用户名已经被注册";
            res.json(responseData);
            return;
        }
        var user = new User({
            username:username,
            password:password
        })
        return user.save();
    }).then((newUserInfo)=>{
        console.log(newUserInfo);
        responseData.message = '注册成功';
        res.json(responseData);
    });
});


router.post('/user/login',(req,res)=>{
    var username = req.body.username;
    var password = req.body.password;

    if(username == '' || password == ''){
        responseData.code = 1;
        responseData.message = "用户名或密码不能为空";
        res.json(responseData);
        return;
    }

    User.findOne({
        username:username,
        password:password
    }).then((userInfo)=>{
        if(!userInfo){
            responseData.code = 2;
            responseData.message = "用户名或密码错误";
            res.json(responseData);
            return;
        }
        responseData.message = "登录成功";
        responseData.userInfo = {
            _id:userInfo._id,
            username:userInfo.username
        };
        req.cookies.set('userInfo',JSON.stringify({
            _id:userInfo._id,
            username:userInfo.username
        }));
        res.json(responseData);
        return;
    })
});

router.get('/user/logout',(req,res)=>{
    req.cookies.set('userInfo',null);
    res.json(responseData);
});

module.exports = router;