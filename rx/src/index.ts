while (true) {
  //Await start signal from main computer
  turtle.refuel(64);
  print("Awaiting Signal...");
  rednet.open("left");
  const [id, msg] = rednet.receive();
  rednet.close("left");

  let blocks: number[][] = [];

  const layers = msg as number;
  print("Signal recieved!");
  print("Generating array..");

  print("Printing layers: ", layers);

  // Initialise 2d Array of [[0,0,0],[0,0,0,0]] etc until 32 rows
  for (let y = 0; y < layers; y++) {
    blocks[y] = [];
    for (let x = 0; x < 32; x++) {
      blocks[y][x] = 0;
    }
  }

  // Move the robot 32 blocks foward digging before each movement an up 8 times
  for (let y = 0; y < layers; y++) {
    for (let x = 0; x < 32; x++) {
      const [block, reason] = turtle.dig();
      const isEvenLayer = y % 2 === 0;

      turtle.forward();
      if (block == true) {
        print("found Block");
        if (isEvenLayer) {
          blocks[y][x] = 1;
        } else {
          //Reverse input when going backwards
          blocks[y][31 - x] = 1;
        }
      }
    }
    //Spin around at end of row
    print("end of row");
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

  //reset to starting position
  for (let y = 0; y < layers; y++) {
    turtle.down();
  }
}
