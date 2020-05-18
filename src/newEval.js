const stdlib = require("./stdlib");

const evaluate = (node) => {
  switch (node.type) {
    case "Program":
      return evalBlock(node.body);
  }

  if (node.value) {
    return node.value;
  }
};

const evalBlock = (block) => {
  let val;
  for (let i = 0; i < block.length; i++) {
    val = evaluate(block[i]);
  }
  return val;
};

const { tokenize } = require("./tokenize");
const { parse } = require("./newParse");

console.log(evaluate(parse(tokenize(`15`))));
