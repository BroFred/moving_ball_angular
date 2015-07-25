var express = require('express');
var router=express.Router();
var bodyParse = require('body-parser');
var model = require('./schema.js').user;
router.get('/',function(req,res){
	model.findOne({},function(erro,data){
		if(erro) throw erro
		res.send(data);
	})
});
router.post('/',bodyParse.json(),function(req,res){
	res.sendStatus(200);
});
module.exports=router;