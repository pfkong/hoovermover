/** hoovermover_verbose.js
 * I decided I didn't want to use this draft for submission because:
 * 1. Commenting was too verbose.
 * 2. Too many console.log lines.
 *
 * Difference between this draft and submission is that you can run "-v" as an option to enable verbose mode.
 * It was helpful for when I was initially stepping through my program to test it.
 **/

// Libraries
const fs = require("fs"); // Node.js is being used as the runtime.

// debug options
let verbose = false; // "-v"
if (process.argv.find((e) => e === "-v")) {
  verbose = true;
  console.log("Verbose mode activated. Time to really talk this up.\n");
}

// Variables
let filepath = "./input.txt",
  // {x, y} coordinates
  roomSize = {},
  position = {},
  // Arrays
  dirtLeft = [],
  directions = [],
  // Counters
  dirtCleared = 0;

// Main thread.
hooverMover();
async function hooverMover() {
  await init();

  // Hoover definitely slurps when cleaning. This is in case the hoover begins on dirt.
  slurp();

  // Move that hoover. Slurping done as necessary.
  for (dir of directions) {
    moveHoover(dir);
  }

  // Print output. Oh, how the hoover has moved!
  if (verbose) console.log("===== Output =====");

  console.log(position.x, position.y);
  console.log(dirtCleared);
}

/* init()
 * Reads input file to initialize Hoover Mover variables.
 */
async function init() {
  let input = await fs.readFileSync(filepath, "utf-8").split("\n");

  // Last line will always be cardinal directions (and thus not a coordinate)
  directions = input.pop().split("");

  // Everything else is a coordinate, data should reflect that. Also parse to Integers to make adding easier later.
  input = input.map((e) => {
    let arr = e.split(" ").map((e) => Number.parseInt(e));
    return { x: arr[0], y: arr[1] };
  });

  // First element will always be room size...
  roomSize = input.shift();

  // Next in line is the hoover's starting position..
  position = input.shift();

  // ...and whatever left is dirt. Literally. Well, in a virtual sense.
  dirtLeft = input;

  if (verbose) {
    console.log("===== Initializing... =====");
    console.log("roomSize: ", roomSize);
    console.log("position: ", position);
    console.log("dirtLeft: ", dirtLeft);
    console.log("directions: ", directions);
    console.log("\n");
    console.log("===== MOVE THAT HOOVER =====\n");
  }
}

/**
 * moveHoover(direction)
 * Given a cardinal direction, translate to coordinates.
 * Move hoover to new position only if the coordinate is within bounds of the room.
 * If moved, slurp() is called. Else ignore.
 **/
function moveHoover(dir) {
  let [x, y] = [0, 0],
    newPosition;
  switch (dir) {
    case "N":
      y++;
      break;
    case "S":
      y--;
      break;
    case "W":
      x--;
      break;
    case "E":
      x++;
      break;
  }
  newPosition = { x: position.x + x, y: position.y + y };

  if (verbose) {
    console.log("moveHoover: ", dir);
    console.log("from: ", position);
    console.log("to:   ", newPosition);
    console.log("\n");
  }

  if (
    newPosition.x > 0 &&
    newPosition.x <= 5 &&
    newPosition.y > 0 &&
    newPosition.y <= 5
  ) {
    position = newPosition;
    slurp();
  } else {
    if (verbose) {
      console.log("Bump! Hoover was not moved.");
    }
  }
}

/**
 * slurp()
 * Hoover slurps on the current position, effectively removing any dirt on it.
 */
function slurp() {
  let index = dirtLeft.findIndex(
    (e) => JSON.stringify(e) === JSON.stringify(position)
  );
  if (index !== -1) {
    dirtLeft.splice(index, 1);
    dirtCleared++;

    if (verbose) {
      console.log("Slurp!");
      console.log("\tDirt found at: ", position);
      console.log("\tdirtCleared: ", dirtCleared);
      console.log("\tRemaining dirt: ", dirtLeft);
      console.log("\n");
    }
  }
}
