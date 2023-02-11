rednet.open("right");

const [id, msg] = rednet.receive();

if (msg == "start") {
  print("hello");
}
