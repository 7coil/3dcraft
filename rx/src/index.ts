rednet.open("right");
const [id, msg] = rednet.receive();
rednet.close("right");

let blocks: number[][] = [];
const layers = 2;

print("generating array..");

for (let y = 0; y < 32; y++) {
  blocks[y] = [];
  for (let x = 0; x < 32; x++) {
    blocks[y][x] = 0;
  }
}

for (let y = 0; y < layers; y++) {
  for (let x = 0; x < 32; x++) {
    const [block, reason] = turtle.dig();
    turtle.forward();
    if (block == true) {
      print("found Block");
      blocks[y][x] = 1;
    }
  }
  turtle.forward();
  turtle.up();
  turtle.turnLeft();
  turtle.turnLeft();
}

print(blocks);

rednet.open("right");
rednet.send(4, blocks);
rednet.close("right");
