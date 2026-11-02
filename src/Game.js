import Player from "./Player.js";

const usedCords = [];
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

let player;

function startGame(ships) {
  player = new Player("Temp Name", true);
  player.createShips(ships, "pBoard", true, null);

  // Need to add visual ids and stuff before
  const opp = new Player("Opp", false);
  opp.createShips(oppShips, "oBoard", false, enemyMove);
}

function enemyMove() {
  let newCords;

  do {
    newCords = {
      x: Math.floor(Math.random() * 10),
      y: Math.floor(Math.random() * 10),
    };
  } while (
    usedCords.some((cord) => cord.x === newCords.x && cord.y === newCords.y)
  );

  usedCords.push(newCords);

  player.getAttacked(newCords);

  if (player.isLost()) {
    endGame();
  }
}

function endGame() {
  console.log("player lost");
}

export default startGame;
