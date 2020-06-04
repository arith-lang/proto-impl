const fs = require("fs");
const path = require("path");
const readline = require("readline");
const chalk = require("chalk");
const { evaluate } = require("./evaluate");

const version = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../package.json"), "utf-8"),
).version;

const repl = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: `${chalk.green(`(arith v${version}):`)} ${chalk.white(
      "> ",
    )}`,
  });
  rl.prompt();

  rl.on("line", (line) => {
    if (line.trim() === "") {
      return rl.prompt();
    }
    switch (line.trim()) {
      case ".end":
        console.log("Have a nice day!");
        process.exit(0);
      case ".q":
        console.log("Have a nice day!");
        process.exit(0);
      case ".quit":
        console.log("Have a nice day!");
        process.exit(0);
      case "quit":
        console.log("Have a nice day!");
        process.exit(0);
      case ".exit":
        console.log("Have a nice day!");
        process.exit(0);
      case "exit":
        console.log("Have a nice day!");
        process.exit(0);
      case ".help":
        console.log(
          chalk.cyan(
            "Welcome to Arith - a simple, Lisp-like programming language.\n",
          ),
        );
        console.log(`You are using Arith ${version}`);
        console.log(chalk.blue("Here are the valid commands:\n"));
        console.log("COMMAND", "                DESCRIPTION");
        console.log(
          "<none>, i",
          "              Open the interpreter in interactive/REPL mode",
        );
        console.log(
          "help",
          "                   Print this help message",
        );
        console.log(
          "version",
          "                Print the version of Arith you're using",
        );
        console.log(
          "run",
          "                    Execute the contents of a valid Arith file",
        );
        console.log(); // blank line
        console.log(
          chalk.cyan(
            "Use the command 'arc <file>' to transpile its contents to JavaScript.\n",
          ),
        );
        console.log("Enjoy!");
        break;
      case "help":
        console.log(
          chalk.cyan(
            "Welcome to Arith - a simple, Lisp-like programming language.\n",
          ),
        );
        console.log(`You are using Arith ${version}`);
        console.log(chalk.blue("Here are the valid commands:\n"));
        console.log("COMMAND", "                DESCRIPTION");
        console.log(
          "<none>, i",
          "              Open the interpreter in interactive/REPL mode",
        );
        console.log(
          "help",
          "                   Print this help message",
        );
        console.log(
          "version",
          "                Print the version of Arith you're using",
        );
        console.log(
          "run",
          "                    Execute the contents of a valid Arith file",
        );
        console.log(); // blank line
        console.log(
          chalk.cyan(
            "Use the command 'arc <file>' to transpile its contents to JavaScript.\n",
          ),
        );
        console.log("Enjoy!");
        break;
      default:
        try {
          console.log(chalk.yellow(evaluate(line.trim())));
        } catch (err) {
          console.error(err);
        }
        break;
    }
    rl.prompt();
  }).on("close", () => {
    console.log("Have a nice day!");
    process.exit(0);
  });
};

if (require.main === module) {
  console.log(
    chalk.bgCyan(
      `*** Welcome to the Arith programming language, v${version} ***`,
    ),
  );
  repl();
}

module.exports = { repl };
