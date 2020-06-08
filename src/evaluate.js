const R = require("ramda");
const { parse } = require("./parse");
const globals = require("./globals");
const {
  createEnv,
  setEnv,
  getValue,
  setValue,
  defVar,
} = require("./environment");
const { ArithTypeError, ArithReferenceError } = require("./errors");

const globalEnv = setEnv(globals);
const moduleEnv = createEnv(globalEnv);

const evaluate = (node, env = moduleEnv) => {
  switch (node.type) {
    case "Program":
      return evalBlock(node.body);
    case "DecimalLiteral":
      return globals.decimal(node.value);
    case "StringLiteral":
      return globals.string(node.value);
    case "NilLiteral":
      return globals.nil;
    case "BooleanLiteral":
      return node.value;
    case "Identifier":
      return getValue(node, env);
    case "CallExpression":
      return apply(node, env);
    case "VariableDefinition":
      return define(node, env);
    case "LambdaExpression":
      return makeLambda(node, env);
    case "IfExpression":
      return applyIf(node, env);
    case "StructDefinition":
      return defineStruct(node, env);
    case "VariableMutation":
      return mutate(node, env);
  }
};

const evalBlock = (block, env) => {
  let val;
  for (let i = 0; i < block.length; i++) {
    val = evaluate(block[i], env);
  }
  return val;
};

const apply = (node, env) => {
  const fn = getValue(node, env);
  const name = fn.name || node.name;
  const args = node.arguments.map((a) => {
    return evaluate(a, env);
  });
  if (fn instanceof Function !== true) {
    throw new ArithTypeError(`${name} is not a function`);
  }
  return fn(...args);
};

const define = (node, env) => {
  return defVar(node.name, evaluate(node.value, env), env);
};

const makeLambda = (node, env) => {
  const lambda = (...args) => {
    const names = node.params;
    const scope = createEnv(env);
    if (names && names.length) {
      names.forEach((n, i) => {
        defVar(n.name, args[i], scope);
      });
    }
    return evalBlock(node.body, scope);
  };
  return R.curry(lambda);
};

const applyIf = (node, env) => {
  const cond = evaluate(node.condition, env);
  if (cond !== false) {
    return evaluate(node.then, env);
  }
  return evaluate(node.else, env);
};

const defineStruct = (node, env) => {
  const structDefiner = {};
  node.fields.forEach((field) => (structDefiner[field.name] = null));
  const structConstructor = (...args) => {
    const structFunc = globals["struct"](structDefiner, node.name);
    let obj = {};
    Object.keys(structDefiner).forEach((key, i) => {
      if (!args[i]) {
        throw new ArithReferenceError(
          `Invalid number of arguments for struct constructor ${node.name}`,
        );
      }
      obj[key] = args[i];
    });
    return structFunc(obj);
  };
  defVar(node.name, structConstructor, env);

  const pred = (obj) => {
    return globals["get-struct-name"](obj) === node.name;
  };
  defVar(`${node.name}?`, pred, env);

  node.fields.forEach((field) => {
    let accessor = (...args) => {
      if (args.length === 1) {
        return globals["get-struct-field"](field.name, args[0]);
      } else if (args.length === 2) {
        return globals["set-struct-field"](
          field.name,
          args[0],
          args[1],
        );
      }
      throw new ArithReferenceError(
        `Invalid accessor call for struct ${node.name}`,
      );
    };
    defVar(`${node.name}-${field.name}`, accessor, env);
  });
};

const mutate = (node, env) => {
  return setValue(node, evaluate(node.value, env), env);
};

module.exports = { evaluate: (input) => evaluate(parse(input)) };
