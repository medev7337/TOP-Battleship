import Game from "./Game.js";
import Player from "./Player.js";

document.querySelector("#restartButton").addEventListener("click", () => {
  window.location.reload();
});

function startGame(ships) {
  const player = new Player("YOU", true);
  player.createShips(ships);

  const opp = new Player("OPP", true);

  const game = new Game(player, opp);
  game.generateEnemyShips();

  game.initGame();
}

export default startGame;
