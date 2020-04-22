const fs = require("fs");
const { parseAndEvaluate } = require("./src/parse-and-evaluate");

const run = (argv) => {
  const [command, ...args] = argv.slice(2);

  if (!command || command.toLowerCase() === "help") {
    console.log("You must enter a valid command\n");
    console.log("Here are the valid commands:");
    console.log("COMMAND", "                    DESCRIPTION");
    console.log(
      "run",
      "                    Execute the contents of a valid Arith file",
    );

    process.exit(0);
  } else if (command.toLowerCase() === "run") {
    const input = fs.readFileSync(args[0], "utf-8");

    console.log(parseAndEvaluate(input));
  }
};

module.exports = { run };
