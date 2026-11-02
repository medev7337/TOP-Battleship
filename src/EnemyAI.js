class EnemyAI {
  constructor() {
    this.usedCords = [];
    this.lastResult = false;
  }

  makeBoard(opp) {
    const ships = [];
  }

  move(player) {
    let newCords = null;

    if (this.lastResult === true) {
      newCords = this.getNeighborInput();
    }
    if (newCords === null) {
      console.log("going random");
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

    const ns = [];

    ns.push({ x: cord.x + 1, y: cord.y });
    ns.push({ x: cord.x - 1, y: cord.y });
    ns.push({ x: cord.x, y: cord.y + 1 });
    ns.push({ x: cord.x, y: cord.y - 1 });

    console.log(ns);

    const rm = [];
    for (let i = 0; i < ns.length; i++) {
      const n = ns[i];
      if (this.usedCords.some((cord) => cord.x === n.x && cord.y === n.y)) {
        rm.push(i);
      }
    }

    rm.forEach((n) => ns.splice(n, 1));

    if (ns.length === 0) {
      return null;
    }

    return ns[Math.floor(Math.random() * ns.length)];
  }
}

export default EnemyAI;
