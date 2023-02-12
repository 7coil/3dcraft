while (true) {
  //Await start signal from main computer
  turtle.refuel(64);
  print("Awaiting Signal...");
  rednet.open("left");
  const [id, msg] = rednet.receive();
  rednet.close("left");

  let blocks: (null | turtle.InspectItemData)[][] = [];

  const layers = msg as number;
  print("Signal recieved!");
  print("Generating array..");

  print("Printing layers: ", layers);

  // Initialise 2d Array of [[0,0,0],[0,0,0,0]] etc until 32 rows
  for (let y = 0; y < layers; y++) {
    blocks[y] = [];
    for (let x = 0; x < 32; x++) {
      blocks[y][x] = null;
    }
  }

  for (let y = 0; y < layers; y++) {
    for (let x = 0; x < 32; x++) {
      const [success, block] = turtle.inspect();
      turtle.dig();
      turtle.forward();
      if (typeof block !== "string" && block !== null) {
        print("Found a block!", block.name);

        if (y % 2 === 1) {
          blocks[y][31 - x] = block;
        } else {
          blocks[y][x] = block;
        }
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

  http.request("http://127.0.0.1:3001/submit", returnArray, {
    "Content-Type": "application/json",
  });

  for (let y = 0; y < layers; y++) {
    turtle.down();
  }
}
