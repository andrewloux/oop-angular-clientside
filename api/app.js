var express = require('express')
  , app = module.exports = express()
  , passport = require('passport')
  , User = require('./schema/user')
  , LocalStrategy = require('passport-local').Strategy
  , bodyParser = require('body-parser')
  , cors = require('cors')

// required for passport
app.use(passport.initialize());
app.use(cors());
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

// receives: username and password
app.post('/authenticate', passport.authenticate('local'), function(req,res){
	// only gets invoked if login is successful
	res.send({status:0, message: "Successfully authenticated"})
	// you get 401 on failure.
})  

app.post('/register', function(req, res) {
  // attach POST to user schema
  var user = new User({ username: req.body.username, email: req.body.email, password: req.body.password });
  // save in Mongo
  user.save(function(err) {
    if(err) {
      console.log(err);
      if (err.code && err.code == 11000){
      	res.send({status:1, message: "Duplicate username exists"});
      }
      else{
		res.send({status:2, message: err});	
      }
    } else {
      res.send({status:0, message: "Successfully registered"})
    }
  });
});

app.listen(3000, function() {
  console.log('Listening on port 3000...')
})
