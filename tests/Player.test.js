import Player from "../src/Player.js";

describe("Player", () => {
  test("add ship to gameboard horizontal", () => {
    const ships = [
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

    const player = new Player("Testing");

    player.createShips(ships);
  });
});
