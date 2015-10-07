var express=require('express'), //loading express
 	stylus=require('stylus'),// loading the css stylus preprocessor
	bodyParser=require('body-parser');//loading the body parser used with express to parse the body of any document sent back to the server
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
app.get('/partials/:partialsPath',function(req,res){
	res.render('partials/'+req.params.partialsPath);
})
//app.use(express.logger('dev'));//turning on express's logging feature
//app.use(express.bodyParser());//parse the body of any document sent back to the server and requirement of some other middlewares to be used
app.get('*',function(req,res){//any routes will be handled
	res.render('index');
});
var port=3030;
app.listen(port);
console.log("Listening to port "+port+" ...");
//node server.js/nodemon 
