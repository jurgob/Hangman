// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var GameSchema   = new mongoose.Schema({
  word2Guess: String,
  alphabet: String,
  wrongAttempsMax: Number,
  letterAttempted: String
});

// Export the Mongoose model
module.exports = mongoose.model('Game', GameSchema);
