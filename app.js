/**
 * Created by ypj on 18-4-25.
 */
var express = require('express');
var swig = require('swig');
var mongoose = require('mongoose');
var cookies = require('cookies');
var bodyParser = require('body-parser');
var User = require('./models/User');
/*app相当于http.createServer()*/
var app = express();
app.use('/public',express.static(__dirname+'/public'));
app.engine('html',swig.renderFile);
app.set('views','./views');
app.set('view engine','html');
swig.setDefaults({cache:false});
app.use(bodyParser.urlencoded({extended:true}));
app.use((req,res,next)=>{
    req.cookies = new cookies(req,res);
    req.userInfo = {};
    if(req.cookies.get('userInfo')){
        try{
            req.userInfo = JSON.parse(req.cookies.get('userInfo'));
            User.findById(req.userInfo._id).then((userInfo)=>{
                    req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
                    next();
                })
        }catch (e){next();}
    }
    else {next();}
});

app.use('/admin',require('./routers/admin'));
app.use('/api',require('./routers/api'));
app.use('/',require('./routers/main'));

mongoose.connect('mongodb://localhost:27017/Test_week',(err)=>{
    if(err)
        console.log("数据库连接失败");
    else{
        console.log("数据库连接成功");
        app.listen(8081);
    }
});
