
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var login = require('./routes/login');
var register = require('./routes/register')
var http = require('http');
var path = require('path');

var app = express();

var mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/nodetest1';
var mongo = require('mongoskin');
var db = mongo.db(mongoUri, {native_parser:true});
db.bind('user');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

function checkAuth(req, res, next) {
    if (!req.session.user_id) {
        res.send('You are not authorized to view this page');
    } else {
        next();
    }
}

app.get('/', routes.index);
app.get('/login', login.login);
app.post('/login', login.do_login);

app.get('/register', register.register);
app.get('/logout', login.logout);
app.post('/register', register.addUser(db));
app.get('/users', user.list(db));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
