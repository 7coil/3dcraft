const askForNumber = (question: string): number => {
  while (true) {
    print(question);
    const answer = parseInt(read(), 10);
    if (!isNaN(answer)) return answer;
    print("That was not a valid input. Please try again.");
  }
};

print("TurtleScript")
let buildHeight = askForNumber("Please enter a build height.");

// If the build height is odd, add an extra layer to make it even.
if (buildHeight % 2 === 1) buildHeight + 1

rednet.open("right");
rednet.broadcast(buildHeight);
rednet.close("right");
