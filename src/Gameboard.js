class Gameboard {
  constructor() {
    this.ships = [];
    this.shipHits = [];
    this.oceanHits = [];
  }

  addShip(ship, position, orientation) {
    if (position.x < 0 || position.y < 0) {
      return false;
    }
    if (position.x + ship.length >= 10 || position.y + ship.length >= 10) {
      return false;
    }

    const ps = [];

    if (orientation === "horizontal") {
      let endX = position.x + ship.length;
      for (let i = position.x; i < endX; i++) {
        ps.push({ x: i, y: position.y });
      }
    } else {
      let endY = position.y + ship.length;
      for (let i = position.y; i < endY; i++) {
        ps.push({ x: position.x, y: i });
      }
    }

    ship.positions = ps;

    this.ships.push(ship);

    return true;
  }

  // Ocean hits check in tests, ship state check too
  receiveAttack(cords) {
    // Checks each ships positions to see if cords equals
    for (let i = 0; i < this.ships.length; i++) {
      let hasShip = false;
      let removeIndex = 0;
      const cs = this.ships[i];
      for (let j = 0; j < cs.positions.length; j++) {
        const pos = cs.positions[j];
        if (pos.x === cords.x && pos.y === cords.y) {
          removeIndex = j;
          hasShip = true;
        }
      }
      if (hasShip) {
        cs.hit();
        cs.positions.splice(removeIndex, 1);
        this.shipHits.push(cords);
        return true;
      }
    }

    this.oceanHits.push(cords);
    return false;
  }

  hasShips() {
    this.ships.forEach((ship) => {
      if (ship.isSunk() === false) return true;
    });
    return false;
  }
}

module.exports = Gameboard;
