const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const { evaluate } = require("./evaluate");
const repl = require("repl");
const vm = require("vm");

const version = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../package.json"), "utf-8"),
).version;

function eval(cmd, context, fileName, callback) {
  let openParenCount = 0,
    closeParenCount = 0;
  for (let i = 0; i < cmd.length; i++) {
    if (cmd[i] === "(") {
      openParenCount++;
    } else if (cmd[i] === ")") {
      closeParenCount++;
    }
  }
  let result;
  try {
    result = vm.runInThisContext(evaluate(cmd));
  } catch (error) {
    if (
      isRecoverableError(error, cmd, openParenCount, closeParenCount)
    ) {
      return callback(new repl.Recoverable(error));
    }
  }
  callback(null, result);
}

function isRecoverableError(
  error,
  cmd,
  openParenCount,
  closeParenCount,
) {
  if (error.name === "SyntaxError") {
    return /^(Unexpected end of input|Unexpected token)/.test(
      error.message,
    );
  } else if (error.name === "TypeError" && /^\(.+[^)]$/.test(cmd)) {
    return true;
  } else if (openParenCount > closeParenCount) {
    return true;
  }
  return false;
}

const initializeRepl = () => {
  const replServer = repl.start({
    prompt: `${chalk.green(`(arith v${version})`)}: ${chalk.white(
      "> ",
    )}`,
    input: process.stdin,
    output: process.stdout,
    eval: eval,
    ignoreUndefined: true,
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
