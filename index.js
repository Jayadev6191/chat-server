var express = require("express");
var app = express();
var port = 3700;

var path = require('path');
var sha1 = require('sha1');
// var methodOverride = require('methodOverride');
var mongoose=require('mongoose');

var bodyParser = require('body-parser');
var sha1 = require('sha1');

app.use(bodyParser());
app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);

var db=mongoose.connection;
mongoose.connect('mongodb://localhost/Employees');

var Schema = new mongoose.Schema({
	name:String,
	password:String
});

var user = mongoose.model('emps',Schema); 

app.post('/users',function(req,res){
		new user({
		name:req.body.username,
		password:sha1(req.body.password),
	}).save(function(err,doc){
		if(err) res.json(err);
		else res.send('successfully inserted..<a href="/">here</a>');
	});
});



var sha1 = require('sha1');
// var methodOverride = require('methodOverride');
var mongoose=require('mongoose');


app.get("/", function(req, res){
	 // res.render("login");
 	res.writeHead(200, {'Content-Type': 'text/html'});
 		res.write('Login<br>');
 		res.write('<form method="POST" action="/chat">');
 		res.write('<input id="username" type="text" name="username"><br>');
 		res.write('<input id="password" type="password" name="password"><br>');
 		res.write('<input id="submit" type="submit" name="submit" value="submit">');
 		res.write('</form>');
 		res.end();
	 
});

app.get("/register", function(req, res){
	// res.render("register");
	
	res.writeHead(200, {'Content-Type': 'text/html'});
		res.write('Registration<br>');
		res.write('<form method="POST" action="/users">');
		res.write('<input id="username" type="text" name="username"><br>');
		res.write('<input id="password" type="password" name="password"><br>');
		res.write('<input id="re-enter" type="password" name="re-enter"><br>');
		res.write('<input id="submit" type="submit" name="submit" value="submit">');
		res.write('</form>');
		res.end();
});

// Movie.findOne({ title: 'Thor' }, function(err, thor) {
//   if (err) return console.error(err);
//   console.dir(thor);
// });

app.post("/chat", function(req, res){
	user.findOne({name:req.body.username},function(err,data){
		var password=sha1(req.body.password);
		// res.send(data.password);
		// res.send(sha1(req.body.password));
		if(password==data.password){
			res.render("page");
		}
		else{
			
			res.send("invalid credentials..try <a href='/'>again</a> ");
			
		}
	});
     // res.render("page");
});

app.use(express.static(__dirname + '/public'));
 
//app.listen(port);
var io = require('socket.io').listen(app.listen(port));

io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});

console.log("Listening on port " + port);