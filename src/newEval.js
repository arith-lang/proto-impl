const stdlib = require("./stdlib");

const evaluate = (node) => {
  switch (node.type) {
    case "Program":
      return evalBlock(node.body);
    case "NumericLiteral":
      return stdlib.number(node.value);
  }
};

const evalBlock = (block) => {
  let val;
  for (let i = 0; i < block.length; i++) {
    val = evaluate(block[i]);
  }
  return val;
};
