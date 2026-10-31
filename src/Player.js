const Gameboard = require("./Gameboard");

class Player {
  constructor(name) {
    this.board = new Gameboard();
  }
}

module.exports = Player;
