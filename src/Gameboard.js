class Gameboard {
  constructor(name) {
    this.playerName = name;
    this.ships = [];
    this.hitPositions = [];
  }

  addShip(ship, position, orientation) {
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

    return ship;
  }

  receiveAttack(cords) {
    this.hitPositions.push(cords);

    // Checks each ships positions to see if cords equals
    for (let i = 0; i < this.ships.length; i++) {
      let hasShip = false;
      const cs = this.ships[i];
      cs.positions.forEach((pos) => {
        if (pos.x === cords.x && pos.y === cords.y) {
          hasShip = true;
        }
      });
      if (hasShip) {
        return true;
      }
    }

    return false;
  }
}

module.exports = Gameboard;
