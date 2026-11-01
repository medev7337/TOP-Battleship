import startGame from "./Game.js";

let placementOrientation = "horizontal";
let cannotPlace = false;

const ships = [
  {
    name: "carrier",
    length: 5,
    side: "",
    startPos: { x: -1, y: -1 },
  },
  {
    name: "battleship",
    length: 4,
    side: "",
    startPos: { x: -1, y: -1 },
  },
  {
    name: "destroyer",
    length: 3,
    side: "",
    startPos: { x: -1, y: -1 },
  },
  {
    name: "submarine",
    length: 3,
    side: "",
    startPos: { x: -1, y: -1 },
  },
  {
    name: "patrolboard",
    length: 2,
    side: "",
    startPos: { x: -1, y: -1 },
  },
];

let currentShip = 0;

const hoverHolder = [];

// Make the divs
const pBoard = document.querySelector("#playerBoard");
for (let y = 0; y < 10; y++) {
  for (let x = 0; x < 10; x++) {
    // Add event listeners
    const div = document.createElement("div");
    div.className = "slot";
    div.dataset.x = x;
    div.dataset.y = y;

    div.addEventListener("mouseenter", () => {
      if (cannotPlace) return;
      // Do the highliting part, etc...
      mouseEnterSlot(div);
    });
    div.addEventListener("click", () => {
      if (cannotPlace) return;
      checkForClicks(div);
    });
    div.addEventListener("mouseleave", () => {
      // Remove the highlighted shit
      mouseExitSlot();
    });

    pBoard.appendChild(div);
  }
}

// Do calculations
function mouseEnterSlot(div) {
  let startX = Number(div.dataset.x);
  let startY = Number(div.dataset.y);

  let endX = startX + ships[currentShip].length;
  let endY = startY + ships[currentShip].length;

  if (placementOrientation === "horizontal") {
    // Horizontal only
    hoverDivs(
      startX,
      endX,
      "horizontal",
      div.dataset.y,
      ships[currentShip].length,
    );
  } else {
    // Vertical only
    hoverDivs(
      startY,
      endY,
      "vertical",
      div.dataset.x,
      ships[currentShip].length,
    );
  }
}

function hoverDivs(startI, endI, side, baseOpp, targetLength) {
  let c = "hovering_invalid";
  const divs = [];

  for (let i = startI; i < endI; i++) {
    let sd;

    if (side === "horizontal") {
      sd = document.querySelector(`div[data-x="${i}"][data-y="${baseOpp}"]`);
    } else {
      sd = document.querySelector(`div[data-x="${baseOpp}"][data-y="${i}"]`);
    }

    if (sd === null) {
      continue;
    }

    if (sd.classList.contains("isShip")) {
      continue;
    } else {
      divs.push(sd);
    }
  }

  if (divs.length === targetLength) {
    c = "hovering";
  }

  divs.forEach((d) => {
    d.classList.add(c);
    hoverHolder.push(d);
  });
}

function checkForClicks(div) {
  if (hoverHolder.length === ships[currentShip].length) {
    hoverHolder.forEach((d) => {
      d.classList.remove("hovering");
      d.classList.remove("hovering_invalid");
      d.classList.add("isShip");
    });
    ships[currentShip].side = placementOrientation;
    ships[currentShip].startPos = { x: div.dataset.x, y: div.dataset.y };
    if (currentShip + 1 >= ships.length) {
      cannotPlace = true;
      return;
    }
    currentShip++;
  }
}

function mouseExitSlot() {
  hoverHolder.forEach((d) => {
    d.classList.remove("hovering");
    d.classList.remove("hovering_invalid");
  });
  hoverHolder.splice(0, hoverHolder.length);
}

document
  .querySelector("#rotateButton")
  .addEventListener("click", switchOrientation);
function switchOrientation() {
  placementOrientation =
    placementOrientation === "horizontal" ? "vertical" : "horizontal";
}

document.querySelector("#clearButton").addEventListener("click", clear);
function clear() {
  cannotPlace = false;
  currentShip = 0;
  for (const child of pBoard.children) {
    child.className = "slot";
  }
}

document.querySelector("#submitButton").addEventListener("click", submit);
function submit() {
  if (cannotPlace === false) return;
  document.querySelector("#placementBoard").remove();
  startGame(ships);
}

// Make a call to correct function with a button
