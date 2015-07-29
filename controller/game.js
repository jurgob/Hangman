var Game = require('../models/game');

// Create endpoint /api/beers for POST
exports.postGame = function(req, res) {
  // Create a new instance of the Beer model
  var game = new Game();
  game.word2Guess = 'Secret';
  game.alphabet = "abcdefghilmnopqrstuvwxyz";
  game.wrongAttempsMax = 6;
  game.letterAttempted = ""

  game.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Beer added to the locker!', data: game });
  });
};

exports.getGames = function(req, res) {
  // Use the Beer model to find all beer
  Game.find({}, function(err, game) {
    if (err)
      res.send(err);

    res.json(game);
  });
};

exports.getGame = function(req, res) {
  // Use the Beer model to find all beer
  Game.find({_id: req.params.game_id}, function(err, game) {
    if (err)
      res.send(err);

    res.json(game);
  });
};


exports.postMove = function(req, res) {
  // Use the Beer model to find all beer
  // :move
  //[ "$item", " - ", "$description" ]
  Game.find({_id: req.params.game_id}, function(err, game) {
    if (err)
      res.send(err);

      var _letterAttempted = game[0].letterAttempted;
      Game.update({ _id: req.params.game_id },  { letterAttempted:  _letterAttempted+req.params.move  } ,function(err, game, raw) {
        if (err)
          res.send(err);
        res.json(game);
      });
  });
