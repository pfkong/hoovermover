const fs = require("fs"); // Node.js is being used as the runtime.

let filepath = "./input.txt",
  roomSize = {},
  position = {},
  directions = [],
  dirtLeft = [],
  dirtCleared = 0;

// Main thread.
async function hooverMover() {
  await init();

  // Hoover definitely slurps when cleaning. I assume the hoover slurps on whereever it starts.
  slurp();

  // Move that hoover. Slurping done as necessary.
  for (dir of directions) {
    moveHoover(dir);
  }

  // Print output. Oh, how the hoover has moved!
  console.log(position.x, position.y);
  console.log(dirtCleared);
}
hooverMover();

/* init()
 * Reads input file and then initializes Hoover Mover variables.
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
}

/**
 * moveHoover(direction)
 * Given a cardinal direction, move hoover to new position if the coordinate is within bounds of the room and slurp().
 * Else, helplessly run into a wall and carry on with life.
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

  if (
    newPosition.x > 0 &&
    newPosition.x <= 5 &&
    newPosition.y > 0 &&
    newPosition.y <= 5
  ) {
    position = newPosition;
    slurp();
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
  }
}
