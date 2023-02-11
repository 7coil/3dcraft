// createBlocks: generates a 3D matrix of blocks.
// Path: tx/src/createBlocks.ts

export default function TurtleMove() {
	rednet.open("right");
	rednet.broadcast("start");
	turtle.forward();
	rednet.close("right");
}

print("TurtleMove() has executed.");
