var express=require('express'), //loading express
 	stylus=require('stylus'),// loading the css stylus preprocessor
	bodyParser=require('body-parser'),//loading the body parser used with express to parse the body of any document sent back to the server
	mongoose=require('mongoose');
var env =process.env.NODE_ENV=process.env.NODE_ENV||'development'; //setting environment variable from node's default or setting it manually for production or development mode
var app=express(); //creating our express application
app.set('views',__dirname+'/server/views');//configuring views by setting view to the location
app.set('view engine','jade');//setting jade view engine
//for stylus
function compile(src,path){ //compile function used by the stylus middleware
	return stylus(src).set('filename',path);	 //source of the css file
}
app.use(stylus.middleware({
	src:__dirname+'/public',
	compile:compile //compile function requires route to our public folder which is done by
}));
app.use(express.static(__dirname+'/public')); //by using the express's static function which tells if any request comes asking for files serve from public directory
//for stylus end

//mongodb part
if(env=="development"){
	mongoose.connect('mongodb://localhost/MEANer');
}else{
	mongoose.connect('mongodb://acesmndr:meaner@ds047632.mongolab.com:47632/meaner'); //the username and password from the mongoLab was changed
}
var db=mongoose.connection;
db.on('error',console.error.bind(console,"connection error ...")); 
db.once('open',function callback(){ //execute once on every server start
	console.log("Database opened");
});
/*var messageSchema = mongoose.Schema({message:String}); //mongoose uses a schema so we create a schema for extracting text from the database
var Message=mongoose.model('Message',messageSchema);
var mongoMessage;
//to insert into mongodb database//mongo use MEANer db.messages.insert({message:'Hello from MongoDB'}) show collections
Message.findOne().exec(function(err,messageDoc){ //find the first document from the database doesn't matter which one 
	mongoMessage=messageDoc.message; //assign message to a variable and send it to index.jade as a parameter from res.render fn of routing
});*///this comment section was used to add mongo section to the page
//mongodb partend

app.get('/partials/:partialsPath',function(req,res){
	res.render('partials/'+req.params.partialsPath);
})
//app.use(express.logger('dev'));//turning on express's logging feature
//app.use(express.bodyParser());//parse the body of any document sent back to the server and requirement of some other middlewares to be used
app.get('*',function(req,res){//any routes will be handled
	res.render('index');
	/*res.render('index',{
		mongoMessage:mongoMessage //send the value of the mongoMessage as a variable for the jade file
	});*/
});

var port=process.env.PORT||3030; //heroku runs on port 80 so configure it to run on the default environment port if it exists else set the port to 3030
app.listen(port);
console.log("Listening to port "+port+" ...");
//node server.js/nodemon 
