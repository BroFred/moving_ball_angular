var mongo=require('mongoose');
if(!mongo.connection['models']['map']){
	var map_schema= new mongo.Schema({height:Number,width:Number,x:Number,y:Number});
	var map = mongo.connection.model("map",map_schema);
	exports.user=map;
}
else{
	exports.user=mongo.connection['models']['map'];
}
