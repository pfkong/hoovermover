# hoovermover

`hoovermover` is a fantastic way to move an automated hoover for cleaning virtual dirt in an input file! 

**Prereqs**
----

1. *node.js* must be available in the running environment, so that the `node` command is available.
1. Files *hoovermover.js* and *input.txt* are in the same directory.
1. *input.txt* should abide the format specified below.

**Running the Program**
----

Running `node hoovermover.js` will run the program.

Using *input.txt* provided in the repo as an example, the expected output is:

```
USER$ node hoovermover.js
1 3
1
```

**input.txt Format**
----

1. 1st line: Coordinates representing the size of the room.
1. 2nd line: Coordinates representing the starting position of the robotic hoover.
1. Any following coordinates represent patches of dirt in the room that could be potentially cleaned by the hoover.
1. Last line is a string of cardinal directions that the hoover will attempt to move in (ordered left to right).

```
5 5
1 2
1 0
2 2
2 3
NNESEESWNWW
```
