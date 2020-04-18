const fs = require("fs"); // Node.js is being used as the runtime.

// Assuming we have more than one file...
if (process.argv.length > 2) {
  let files = process.argv.splice(2, process.argv.length - 2);
  files.forEach((f) => {
    hooverMover(f);
  });
} else {
  hooverMover("input.txt");
}

function hooverMover(file) {
  let filepath = file,
    roomSize = {},
    position = {},
    directions = [],
    dirtLeft = [],
    dirtCleared = 0;

  if (fs.existsSync(file)) {
    init();
    // Hoover definitely slurps when cleaning. I assume the hoover begins slurping dirt whereever it begins.
    slurp();
    // Move that hoover in the order of each direction given. Slurping done as necessary.
    directions.forEach((dir) => {
      moveHoover(dir);
    });
    // Print output. Oh, how the hoover has moved!
    console.log("[file: " + file + "]");
    console.log(position.x, position.y);
    console.log(dirtCleared);
  } else {
    console.log("[Error: file '" + file + "' does not exist.]");
  }

  /* init()
   * Reads input file and then initializes hoovermover variables.
   */
  function init() {
    let input = fs.readFileSync(filepath, "utf-8").split("\n"); // didn't want to use async/await just for this.
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
      newPosition.x >= 0 &&
      newPosition.x < 5 &&
      newPosition.y >= 0 &&
      newPosition.y < 5
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
}
