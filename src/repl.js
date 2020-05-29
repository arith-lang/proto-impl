const fs = require("fs");
const path = require("path");
const { prompt } = require("inquirer");
const chalk = require("chalk");
const { evaluate } = require("./evaluate");

const version = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../package.json"), "utf-8"),
).version;

const getInput = () => {
  const input = [
    {
      name: "INPUT",
      type: "input",
      prefix: chalk.green(`(arith v${version}):`),
      message: ">",
    },
  ];

  return prompt(input);
};

const repl = async () => {
  try {
    const { INPUT } = await getInput();

    if (INPUT.trim()) {
      console.log(chalk.yellow(evaluate(INPUT)));
    }
  } catch (e) {
    console.error(e);
  }

  repl();
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
