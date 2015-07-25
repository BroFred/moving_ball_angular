var mongo=require('mongoose');
if(!mongo.connection['models']['map']){
	var map_schema= new mongo.Schema({feature:[]});
	var map = mongo.connection.model("map",map_schema);
	exports.user=map;
}
else{
	exports.user=mongo.connection['models']['map'];
}
