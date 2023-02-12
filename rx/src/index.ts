rednet.open("right");
const [id, msg] = rednet.receive();
rednet.close("right");

let blocks: number[][] = [];
const layers = 2;

print("generating array..");

// Array is = [[0,0,0],[0,0,0,0]]
for (let y = 0; y < layers; y++) {
	blocks[y] = [];
	for (let x = 0; x < 32; x++) {
		blocks[y][x] = 0;
	}
}

// General movements
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

print(blocks[0]);

let returnArray = textutils.serializeJSON(blocks);

const request = http.request("http://127.0.0.1:3001/test", returnArray, {
	"Content-Type": "application/json",
});

// const request = http.request("https://example.tweaked.cc")
// print(request.readAll())
// -- => HTTP is working!
// request.close()

// rednet.open("right");
// rednet.send(4, returnArray);
// rednet.close("right");

for (let y = 0; y < layers; y++) {
	turtle.down();
}

//https://tweaked.cc/module/http.html#v:post
