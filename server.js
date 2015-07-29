// Load required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var hangman = require('./controller/game');

// Connect to the beerlocker MongoDB
mongoose.connect('mongodb://localhost:27017/Hangman');

// Create our Express application
var app = express();


// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// Use the passport package in our application
// app.use(passport.initialize());

// Create our Express router
var router = express.Router();


router.route('/games')
  .post(hangman.postGame)
  .get(hangman.getGames)

router.route('/games/:game_id')
    .get(hangman.getGame)

router.route('/games/:game_id/moves/:move')
  .post(hangman.postMove)

app.use('/api',router);

// Start the server
app.listen(4000);
