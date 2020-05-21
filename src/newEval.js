const stdlib = require("./stdlib");
const _Boolean = require("./stdlib/types/Boolean");

const evaluate = (node) => {
  switch (node.type) {
    case "Program":
      return evalBlock(node.body);
    case "NumericLiteral":
      return stdlib.number(node.value);
    case "StringLiteral":
      return stdlib.string(node.value);
    case "NilLiteral":
      return stdlib.nil;
    case "BooleanLiteral":
      return new _Boolean(node.value);
  }
};

const evalBlock = (block) => {
  let val;
  for (let i = 0; i < block.length; i++) {
    val = evaluate(block[i]);
  }
  return val;
};
