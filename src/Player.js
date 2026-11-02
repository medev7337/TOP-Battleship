import Ship from "./Ship.js";
import Gameboard from "./Gameboard.js";

class Player {
  constructor(name, shipVisibility) {
    this.name = name;
    this.board = new Gameboard();
    this.shipVisibility = shipVisibility;
    this.slots = [];
  }

  createShips(ships) {
    ships.forEach((ship) => {
      const newShip = new Ship(ship.name, ship.length);
      this.board.addShip(newShip, ship.startPos, ship.side);
    });
  }

  initUI(interactable, listener = null) {
    this.playerBoardDiv = document.createElement("div");
    this.playerBoardDiv.className = "board";
    document.querySelector("main").appendChild(this.playerBoardDiv);

    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        const newDiv = document.createElement("div");
        newDiv.className = "gameSlot";
        newDiv.dataset.x = x;
        newDiv.dataset.y = y;
        if (interactable) {
          newDiv.addEventListener("click", (e) => listener(e));
        }
        this.slots.push(newDiv);
        this.playerBoardDiv.appendChild(newDiv);
      }
    }

    this.board.updateUI(this.slots, this.shipVisibility);
  }

  getAttacked(cords) {
    const out = this.board.receiveAttack(cords);
    this.board.updateUI(this.slots, this.shipVisibility);
    return out;
  }

  isLost() {
    return !this.board.hasShips();
  }
}

export default Player;
