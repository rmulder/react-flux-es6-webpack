var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/User');

mongoose.connect('mongodb:uri');

app.use( express.static('dist') );
app.use( bodyParser.json() );
app.use( cookieParser() );
app.use( session({ secret: 'things you like', resave: false, saveUninitialized: true }));
app.use( passport.initialize() );
app.use( passport.session() );

passport.use(new LocalStrategy(User.authenticate()));

// serializeUser to the session
passport.serializeUser(function(user, done) {
    console.log('serializeUser: ' + user._id);
    done(null, user._id);
});

// deserializeUser from the session
passport.deserializeUser(function(id, done) {
    console.log('deserializeUser');
    User.findById(id, function(err, user){
        console.log(user);
        if(!err) done(null, user);
        else done(err, null);
    });
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + '/index.html')
});

app.post('/login', passport.authenticate('local'), function (req, res) {
  res.json(req.user);
});

app.get("/session", function(req, res) {
  res.json(req.session);
});

app.get("/session-destroy", function(req, res) {
  req.session.destroy();
  res.json(req.session);
});

app.get('/users', function (req, res) {
  User.find({}, function (err, user) {
      res.json(user);
  });
});

app.post('/users', function (req, res) {
    User.register(new User({
        username: req.body.username
    }), req.body.password, function(err, account) {
        if (err) {
            return res.json(err);
        }

        passport.authenticate('local')(req, res, function () {
            res.json(account);
        });
    });
});

app.listen(process.env.PORT || 3000, function() {
    console.log("Server listening on port 3000");
});
