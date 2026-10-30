const Gameboard = require("../src/Gameboard.js");

describe("Gameboard", () => {
  test("gameboard initializes correctly", () => {
    const gb = new Gameboard("Player Board");

    expect(gb.playerName).toBe("Player Board");
  });
});
