// recieveData: recieves data sent from completed scan of turtle
// path: tx/src/recieveData.ts

export default function recieveData() {
  let responses = [];
  let recieving = true;
  rednet.open("right");

  for (let i = 0; i < 3; i++) {
    const [id, msg] = rednet.receive();
    responses.push(msg);
    print(responses[i]);
  }

  print("data recieved.");

  rednet.close("right");
}
