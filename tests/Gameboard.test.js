const Gameboard = require("../src/Gameboard.js");
const Ship = require("../src/Ship.js");

describe("Gameboard", () => {
  test("add ship to gameboard horizontal", () => {
    const gb = new Gameboard();
    const ship = new Ship("testShip", 3);

    const returnShip = new Ship("testShip", 3);
    returnShip.positions = [
      { x: 3, y: 4 },
      { x: 4, y: 4 },
      { x: 5, y: 4 },
    ];

    const out = gb.addShip(ship, { x: 3, y: 4 }, "horizontal");
    expect(gb.ships[0]).toEqual(returnShip);
  });

  test("add ship to gameboard vertical", () => {
    const gb = new Gameboard();
    const ship = new Ship("testShip", 3);

    const returnShip = new Ship("testShip", 3);
    returnShip.positions = [
      { x: 3, y: 4 },
      { x: 3, y: 5 },
      { x: 3, y: 6 },
    ];

    gb.addShip(ship, { x: 3, y: 4 }, "vertical");
    expect(gb.ships[0]).toEqual(returnShip);
  });

  it.each([
    // Horizontal boundaries
    [{ x: 0, y: 4 }, "horizontal", 3, true],
    [{ x: 6, y: 4 }, "horizontal", 3, true],
    [{ x: 8, y: 4 }, "horizontal", 3, false],
    [{ x: -1, y: 4 }, "horizontal", 3, false],

    // Vertical boundaries
    [{ x: 4, y: 0 }, "vertical", 3, true],
    [{ x: 4, y: 5 }, "vertical", 4, true],
    [{ x: 4, y: 8 }, "vertical", 3, false],
    [{ x: 4, y: -1 }, "vertical", 3, false],
  ])(
    "ship placement at %j with %s orientation",
    (position, orientation, length, expected) => {
      const gb = new Gameboard();
      const ship = new Ship("testShip", length);

      const result = gb.addShip(ship, position, orientation);

      expect(result !== false).toBe(expected);
    },
  );

  test("gameboard receives attack to a ship", () => {
    const gb = new Gameboard();
    const ship = new Ship("testShip", 3);

    gb.addShip(ship, { x: 3, y: 4 }, "vertical");

    out = gb.receiveAttack({ x: 3, y: 5 });

    expect(ship.hits).toBe(1);
    expect(ship.positions).toEqual([
      { x: 3, y: 4 },
      { x: 3, y: 6 },
    ]);
    expect(out).toBe(true);
  });

  test("gameboard receives attack to ocean", () => {
    const gb = new Gameboard();
    const ship = new Ship("testShip", 3);

    gb.addShip(ship, { x: 3, y: 4 }, "horizontal");

    out = gb.receiveAttack({ x: 2, y: 5 });

    expect(gb.oceanHits).toEqual([{ x: 2, y: 5 }]);
    expect(out).toBe(false);
  });

  test("gameboard has ships", () => {
    const gb = new Gameboard();
    const ship = new Ship("testShip", 3);
    const ship1 = new Ship("testShip2", 2);

    gb.addShip(ship, { x: 3, y: 4 }, "vertical");
    gb.addShip(ship1, { x: 5, y: 6 }, "horizontal");

    gb.receiveAttack({ x: 3, y: 4 });
    gb.receiveAttack({ x: 3, y: 5 });
    gb.receiveAttack({ x: 3, y: 6 });
    gb.receiveAttack({ x: 5, y: 6 });
    gb.receiveAttack({ x: 6, y: 6 });

    expect(gb.hasShips()).toBe(false);
  });
});
