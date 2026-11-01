import Ship from "./Ship.js";
import Gameboard from "./Gameboard.js";

class Player {
  constructor(name, shipVisibility) {
    this.name = name;
    this.board = new Gameboard();
    this.shipVisibility = shipVisibility;
  }

  createShips(ships) {
    this.playerBoardDiv = document.createElement("div");
    this.playerBoardDiv.id = "playerBoard";
    document.querySelector("main").appendChild(this.playerBoardDiv);
    ships.forEach((ship) => {
      const newShip = new Ship(ship.name, ship.length);
      this.board.addShip(newShip, ship.startPos, ship.side);
    });
    this.updateUI();
  }

  updateUI() {
    this.board.updateVisuals(this.playerBoardDiv, this.shipVisibility);
  }
}

export default Player;
