import Player from "./Player.js";

function startGame(ships) {
  const player = new Player("Temp Name", true);
  player.createShips(ships);

  // Need to add visual ids and stuff before
  const opp = new Player("Opp", false);
}

export default startGame;
