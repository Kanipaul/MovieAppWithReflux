var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var movie = require('./api/routes/movies/movie');
var config=require('./config/config.json');
var path = require('path');
// var movie = require('./models/movies/movie');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// User model
var User = require('./models/user/user');
//Get the instance of express app
var app = express();
app.use(passport.initialize());
app.use(passport.session());
//Assign body-parser to the app for getting the post data from req body
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, '../Client/dist')));
// Assign /Api as the root of the application
app.use('/api', movie);
//Login request
app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/loginSuccess',
    failureRedirect: '/loginFailure',
  })
);
app.get('/loginFailure', function(req, res, next) {
  res.sendFile('index.html', { root: path.join(__dirname, '../Client/dist') });
});
app.get('/loginSuccess', function(req, res, next) {
  res.render(main.html);
  //res.sendFile('main.html', { root: path.join(__dirname, '../Client/dist') });
});
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});
passport.use(new LocalStrategy(function(username, password, done) {
  console.log("inside authentication function");
    User.findOne({
    'username': username,
    }, function(err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      console.log("Username not found");
      return done(null, false);
    }
    if (user.password != password) {
      console.log("Password mismatch");
      return done(null, false);
    }
      return done(null, user);
    });
}));
//Connect to Mongo Database, If custom connections are not made then this connection will be shared across all models
mongoose.connect(config.DatabaseURL);
// assign the mongoose connection to a variable
var db = mongoose.connection;
//Verify the connection status with the database
db.on('error', console.error.bind(console,'Connection error ...!!!!!'));
db.once('open',function(){
  console.log("Connected to MongoDB successfully");
})
var port = config.port;
//instantiate the server at the specified port
app.listen(port, function(){
  console.log("Server started at port :"+port);
});
