# hoovermover.js

`hoovermover.js` is a fantastic way to move an automated hoover for cleaning virtual dirt in an input file!

## **Prereqs**

1. Download _hoovermover.js_ and at least _input.txt_ into a directory of your choice. Optionally, download any of the other .txt input files.
1. _node.js_ must be available in the running environment, so that the `node` command is available.
1. Files _hoovermover.js_ and _input.txt_ are in the same directory.
1. _input.txt_ should abide the format specified below.

## Usage

```
node hoovermover.js [file, ...]

Inputs:
file: Name of file(s).

Outputs:
1. Input file name
2. Position of hoover
3. # of dirt spots hoovered
```

No file param assumes `input.txt`.

## **Running the Program**

### Single Input File / No Input File
Running `node hoovermover.js` will run the program.

Using the _input.txt_ provided in the repo as an example, the expected output is:

```
USER$ node hoovermover.js
[file: input.txt]
1 3
1
```

### Multiple Input Files
Running `node hoovermover.js *.txt` will attempt to move all the hoovers across given files. Using all .txt files provided in the repo as an example:

```
Peters-MBP:hoovermover peterkong$ node hoovermover.js *.txt
[file: input.txt]
1 3
1
[file: test_hooverAll.txt]
1 0
3
[file: test_outOfBounds1.txt]
0 0
1
[file: test_outOfBounds2.txt]
4 4
0
```

## **input.txt Format**

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
