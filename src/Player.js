import Ship from "./Ship.js";
import Gameboard from "./Gameboard.js";

class Player {
  constructor(name, shipVisibility) {
    this.name = name;
    this.board = new Gameboard();
    this.shipVisibility = shipVisibility;
    this.slots = [];
  }

  createShips(ships, boardId, isPlayer, enemyMove) {
    this.playerBoardDiv = document.createElement("div");
    this.playerBoardDiv.id = boardId;
    this.playerBoardDiv.className = "board";
    document.querySelector("main").appendChild(this.playerBoardDiv);
    ships.forEach((ship) => {
      const newShip = new Ship(ship.name, ship.length);
      this.board.addShip(newShip, ship.startPos, ship.side);
    });
    this.updateVisuals(isPlayer, enemyMove);
    this.board.updateUI(this.slots, this.shipVisibility);
  }

  updateVisuals(isPlayer, enemyMove) {
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        const newDiv = document.createElement("div");
        newDiv.className = isPlayer ? "slot" : "enemySlot";
        if (!isPlayer) {
          newDiv.classList.add("interactable");
          newDiv.addEventListener(
            "click",
            () => {
              console.log("clicked");
              this.getAttacked({ x: x, y: y });
              newDiv.classList.remove("interactable");

              if (this.isLost()) {
                // Game over
                console.log("game over");
              } else {
                enemyMove();
              }
            },
            { once: true },
          );
        }
        newDiv.dataset.x = x;
        newDiv.dataset.y = y;
        this.slots.push(newDiv);
        this.playerBoardDiv.appendChild(newDiv);
      }
    }
  }

  getAttacked(cords) {
    this.board.receiveAttack(cords);
    this.board.updateUI(this.slots, this.shipVisibility);
  }

  isLost() {
    return !this.board.hasShips();
  }
}

export default Player;
