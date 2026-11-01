class Gameboard {
  constructor() {
    this.ships = [];
    this.shipHits = [];
    this.oceanHits = [];
  }

  addShip(ship, position, orientation) {
    position.x = Number(position.x);
    position.y = Number(position.y);

    if (position.x < 0 || position.y < 0) {
      return false;
    }

    if (orientation === "horizontal" && Number(position.x) + ship.length > 10) {
      return false;
    }

    if (orientation === "vertical" && Number(position.y) + ship.length > 10) {
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
    for (let i = 0; i < this.ships.length; i++) {
      const ship = this.ships[i];
      if (ship.isSunk() === false) {
        return true;
      }
    }
    return false;
  }

  updateUI(slots, showShips) {
    slots.forEach((slot) => {
      let x = Number(slot.dataset.x);
      let y = Number(slot.dataset.y);

      if (showShips) {
        this.ships.forEach((ship) => {
          ship.positions.forEach((pos) => {
            if (pos.x === x && pos.y === y) {
              if (!slot.classList.contains("ship")) {
                slot.classList.add("ship");
              }
            }
          });
        });
      }

      this.shipHits.forEach((hit) => {
        if (hit.x === x && hit.y === y) {
          if (!slot.classList.contains("shipHit")) {
            slot.classList.add("shipHit");
          }
        }
      });
      this.oceanHits.forEach((hit) => {
        if (hit.x === x && hit.y === y) {
          if (!slot.classList.contains("oceanHit")) {
            slot.classList.add("oceanHit");
          }
        }
      });
    });
  }
}

export default Gameboard;
