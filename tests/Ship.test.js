const Ship = require("../src/Ship.js");

describe("Ship", () => {
  test("initializes correctly", () => {
    const ship = new Ship("test", 3);

    expect(ship.length).toBe(3);
    expect(ship.hits).toBe(0);
  });

  test("increases hits", () => {
    const ship = new Ship("test", 3);

    ship.hit();

    expect(ship.hits).toBe(1);
  });

  test("is not sunk before enough hits", () => {
    const ship = new Ship("test", 3);

    ship.hit();
    ship.hit();

    expect(ship.isSunk()).toBe(false);
  });

  test("is sunk after enough hits", () => {
    const ship = new Ship("test", 3);

    ship.hit();
    ship.hit();
    ship.hit();

    expect(ship.isSunk()).toBe(true);
  });
});
