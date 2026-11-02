import Game from "./Game.js";
import Player from "./Player.js";

const oppShips = [
  {
    name: "carrier",
    length: 5,
    side: "horizontal",
    startPos: {
      x: "4",
      y: "5",
    },
  },
  {
    name: "battleship",
    length: 4,
    side: "horizontal",
    startPos: {
      x: "4",
      y: "6",
    },
  },
  {
    name: "destroyer",
    length: 3,
    side: "horizontal",
    startPos: {
      x: "4",
      y: "7",
    },
  },
  {
    name: "submarine",
    length: 3,
    side: "horizontal",
    startPos: {
      x: "4",
      y: "8",
    },
  },
  {
    name: "patrolboard",
    length: 2,
    side: "horizontal",
    startPos: {
      x: "4",
      y: "9",
    },
  },
];

function startGame(ships) {
  const player = new Player("YOU", true);
  player.createShips(ships);

  const opp = new Player("OPP", true);
  opp.createShips(oppShips);

  const game = new Game(player, opp);

  game.initGame();
}

export default startGame;
