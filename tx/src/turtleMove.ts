// createBlocks: generates a 3D matrix of blocks.
// Path: tx/src/createBlocks.ts

export default function turtleMove() {
  rednet.open("right");
  rednet.broadcast("start");
  rednet.close("right");
}

print("TurtleMove() has executed.");
