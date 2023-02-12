while (true) {
  //Await start signal from main computer
  turtle.refuel(64);
  print("Awaiting Signal...");
  rednet.open("left");
  const [id, msg] = rednet.receive();
  rednet.close("left");

let blocks: number[][] = [];
const layers = 4;

  print("Signal recieved!");
  print("Generating array..");

for (let y = 0; y < layers; y++) {
  blocks[y] = [];
  for (let x = 0; x < 32; x++) {
    blocks[y][x] = 0;
  }
}

for (let y = 0; y < layers; y++) {
  turtle.forward();
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

  //Send compelted array of single bot to backend
  const fileList = fs.list("/");
  const minerID = fileList.find((x) => x.includes("scan"));
  print("Sending data....");
  let returnArray = textutils.serializeJSON({
    minerID,
    blocks,
  });
  const request = http.request("http://127.0.0.1:3001/submit", returnArray, {
    "Content-Type": "application/json",
  });

let returnArray = textutils.serializeJSON(blocks);

rednet.open("right");
rednet.send(4, returnArray);
rednet.close("right");

for (let y = 0; y < layers; y++) {
  turtle.down();
}
