var express = require('express'); 
var http = require('http'); 
var path = require('path'); 
var createError = require('http-errors'); 


//initialize variable 
var indexRouter = require('./routes/index'); 
var uploadRouter = require('./routes/upload'); 


//basic setting 
var app = express(); 
var server = http.createServer(app); 

app.set('views', path.join(__dirname, 'view')); 
app.set('view engine', 'ejs'); 
app.engine('html', require('ejs').renderFile); 

app.use(express.json()); 
app.use(express.urlencoded({extended: false})); 
app.use('/public', express.static(path.join(__dirname, 'public')));

//router and server running info 
app.use('/', indexRouter); 
app.use('/upload', uploadRouter)

//error handling 
app.get('/start', function(req, res){ 
	res.send('start page'); }); 
app.use(function(req, res, next){
	var err = new Error('not found'); 
	err.status = 404; 
	next(err); 
}) 
app.use(function(err, req, res, next){
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	res.status(err.status || 500);
	res.render('error');
}); 

server.listen(3000, '127.0.0.1', function() { 
		console.log('Server listen on port ' + server.address().port); 
});

