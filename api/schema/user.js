var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Connect mongoose
mongoose.connect('mongodb://localhost:27017/oop', function(err) {
  if (err) {
    console.log('Could not connect to mongodb on localhost. Ensure that you have mongodb running on localhost and mongodb accepts connections on standard ports!');
  }
});

var User = new Schema({
	username: String,
	email: String, 
	password: String
});


User.methods.validPassword = function( pwd ) {
    // EXAMPLE CODE!
    return ( this.password === pwd );
};

module.exports = mongoose.model('User', User);

