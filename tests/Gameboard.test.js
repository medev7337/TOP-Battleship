const Gameboard = require("../src/Gameboard.js");
const Ship = require("../src/Ship.js");

describe("Gameboard", () => {
  test("gameboard initializes correctly", () => {
    const gb = new Gameboard("Player Board");

    expect(gb.playerName).toBe("Player Board");
  });

  test("add ship to gameboard horizontal", () => {
    const gb = new Gameboard("Player Board");
    const ship = new Ship("testShip", 3);

    const returnShip = new Ship("testShip", 3);
    returnShip.positions = [
      { x: 3, y: 4 },
      { x: 4, y: 4 },
      { x: 5, y: 4 },
    ];

    const out = gb.addShip(ship, { x: 3, y: 4 }, "horizontal");
    expect(out).toEqual(returnShip);
  });

  test("add ship to gameboard vertical", () => {
    const gb = new Gameboard("Player Board");
    const ship = new Ship("testShip", 3);

    const returnShip = new Ship("testShip", 3);
    returnShip.positions = [
      { x: 3, y: 4 },
      { x: 3, y: 5 },
      { x: 3, y: 6 },
    ];

    const out = gb.addShip(ship, { x: 3, y: 4 }, "vertical");
    expect(out).toEqual(returnShip);
  });

  test("gameboard receives attack to a ship", () => {
    const gb = new Gameboard("Player Board");
    const ship = new Ship("testShip", 3);

    gb.addShip(ship, { x: 3, y: 4 }, "vertical");

    out = gb.receiveAttack({ x: 3, y: 5 });

    expect(out).toBe(true);
  });
});
