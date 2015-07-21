var express = require('express');
var router=express.Router();
var bodyParse = require('body-parser');
router.get('/',function(req,res){
	res.sendStatus(200);
});
router.post('/',bodyParse.json(),function(req,res){
	console.log(req.body['obs']);
	res.sendStatus(200);
});
module.exports=router;