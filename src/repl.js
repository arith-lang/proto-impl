const fs = require("fs");
const path = require("path");
const { prompt } = require("inquirer");
const chalk = require("chalk");
const { evaluate } = require("./evaluate");
const repl = require("repl");
const { help } = require("./help");

const version = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../package.json"), "utf-8"),
).version;

const eval = (cmd, context, filename, callback) => {
  callback(null, evaluate(cmd));
};

const initializeRepl = () => {
  const replServer = repl.start({
    prompt: `${chalk.green(`(arith v${version})`)}: ${chalk.white(
      "> ",
    )}`,
    input: process.stdin,
    output: process.stdout,
    eval: eval,
  });
  replServer.on("exit", () => {
    console.log("Have a nice day!");
    process.exit();
  });
  replServer.defineCommand("version", {
    help: "Displays the current version of Arith",
    action(name) {
      this.clearBufferedCommand();
      console.log(`Arith version ${version}`);
      this.displayPrompt();
    },
  });
  replServer.defineCommand("help", {
    help: "Displays the valid commands in Arith",
    action(name) {
      this.clearBufferedCommand();
      console.log(
        chalk.cyan(
          "Welcome to Arith - a simple, Lisp-like programming language.\n",
        ),
      );
      console.log(`You are using Arith ${version}`);
      console.log(chalk.blue("Here are the valid commands:\n"));
      console.log("COMMAND", "                DESCRIPTION");
      help.map(([command, description]) =>
        command.length >= 6
          ? console.log(command, `\t\t${description}`)
          : console.log(command, `\t\t\t${description}`),
      );
      console.log(); // blank line
      console.log(
        chalk.cyan(
          "Use the command 'arc <file>' to transpile its contents to JavaScript.\n",
        ),
      );
      console.log("Enjoy!");
      this.displayPrompt();
    },
  });
};

if (require.main === module) {
  console.log(
    chalk.bgCyan(
      `*** Welcome to the Arith programming language, v${version} ***`,
    ),
  );
  initializeRepl();
}

module.exports = { initializeRepl };
