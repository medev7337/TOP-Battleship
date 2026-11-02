const shipConf = [
  {
    name: "carrier",
    length: 5,
  },
  {
    name: "battleship",
    length: 4,
  },
  {
    name: "destroyer",
    length: 3,
  },
  {
    name: "submarine",
    length: 3,
  },
  {
    name: "patrolboard",
    length: 2,
  },
];

class EnemyAI {
  constructor() {
    this.usedCords = [];
    this.lastResult = false;
  }

  makeBoard(opp) {
    const ships = [];

    const taken = [];

    for (let i = 0; i < 5; i++) {
      const cs = shipConf[i];

      let newCords = {};
      let ps = [];
      let side = "";

      do {
        newCords = {};
        ps = [];
        side = "";

        side = Math.floor(Math.random() * 2) === 1 ? "vertical" : "horizontal";

        if (side === "horizontal") {
          newCords = {
            x: Math.floor(Math.random() * (10 - cs.length + 1)),
            y: Math.floor(Math.random() * 10),
          };
        } else {
          newCords = {
            x: Math.floor(Math.random() * 10),
            y: Math.floor(Math.random() * (10 - cs.length + 1)),
          };
        }

        if (side === "horizontal") {
          let endX = newCords.x + cs.length;
          for (let i = newCords.x; i < endX; i++) {
            ps.push({ x: i, y: newCords.y });
          }
        } else {
          let endY = newCords.y + cs.length;
          for (let i = newCords.y; i < endY; i++) {
            ps.push({ x: newCords.x, y: i });
          }
        }
      } while (taken.some((a) => ps.some((b) => a.x === b.x && a.y === b.y)));

      for (let i = 0; i < ps.length; i++) {
        taken.push(ps[i]);
      }

      ships.push({
        name: cs.name,
        length: cs.length,
        side: side,
        startPos: newCords,
      });
    }

    opp.createShips(ships);
  }

  move(player) {
    let newCords = null;

    if (this.lastResult === true) {
      newCords = this.getNeighborInput();
    }
    if (newCords === null) {
      do {
        newCords = {
          x: Math.floor(Math.random() * 10),
          y: Math.floor(Math.random() * 10),
        };
      } while (
        this.usedCords.some(
          (cord) => cord.x === newCords.x && cord.y === newCords.y,
        )
      );
    }

    this.usedCords.push(newCords);

    this.lastResult = player.getAttacked(newCords);
  }

  getNeighborInput() {
    const cord = this.usedCords[this.usedCords.length - 1];

    const ns = [
      { x: cord.x + 1, y: cord.y },
      { x: cord.x - 1, y: cord.y },
      { x: cord.x, y: cord.y + 1 },
      { x: cord.x, y: cord.y - 1 },
    ];

    const available = ns.filter(
      (n) =>
        n.x >= 0 &&
        n.x < 10 &&
        n.y >= 0 &&
        n.y < 10 &&
        !this.usedCords.some((cord) => cord.x === n.x && cord.y === n.y),
    );

    if (available.length === 0) return null;

    return available[Math.floor(Math.random() * available.length)];
  }
}

export default EnemyAI;
