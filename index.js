var express= require('express');
var app=express();
var Q = require('q');
var mapArr=[];
var http=require('http').Server(app);// shared listener
var io=require('socket.io')(http);
require('./socket.js').ball(io,mapArr);
var router=require('./router.js');
var mongo=require('mongoose');
mongo.connect('mongodb://localhost/test');
//------>router
app.use('/map',router);
app.use(express.static('public'));
//------>router
http.listen(process.env.PORT||3000,function(){console.log("listen 3000")});
