import EnemyAI from "./EnemyAI.js";

class Game {
  constructor(player, opp) {
    this.player = player;
    this.opp = opp;

    this.enemyAI = new EnemyAI();

    this.playerTurn = true;
  }

  initGame() {
    this.player.initUI(false);
    this.opp.initUI(true, this.playerInput.bind(this));
  }

  playerInput(e) {
    if (this.playerTurn === false) return;

    const d = e.target;

    const x = Number(d.dataset.x);
    const y = Number(d.dataset.y);

    const newCords = { x: x, y: y };

    this.opp.getAttacked(newCords);

    this.playerTurn = false;

    if (this.opp.isLost()) {
      this.endGame("player");
      return;
    }

    setTimeout(() => {
      this.oppInput();
    }, 500);

    e.target.replaceWith(e.target.cloneNode(true));
  }

  oppInput() {
    if (this.playerTurn === true) return;

    this.enemyAI.move(this.player);
    console.log("I'm done");

    if (this.player.isLost()) {
      this.endGame("opp");
      return;
    }

    this.playerTurn = true;
  }

  endGame(winner) {
    console.log(winner);
  }
}

export default Game;
