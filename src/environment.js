const { ArithReferenceError } = require("./errors");

const createEnv = (parent) => {
  const newEnv = Object.create(parent ? parent : null);
  newEnv.parent = parent || null;
  return newEnv;
};

const setEnv = (obj, parent) => {
  const env = createEnv(parent);

  for (key of Object.keys(obj)) {
    env[Symbol.for(key)] = obj[key];
  }

  return env;
};

const symbolExists = (name, env) => {
  return (
    env[Symbol.for(name)] ||
    env[Symbol.for(name)] === 0 ||
    env[Symbol.for(name)] === false ||
    env[Symbol.for(name)] === null ||
    env[Symbol.for(name)] === ""
  );
};

const lookup = (node, env) => {
  let scope = env;
  while (scope) {
    if (symbolExists(node.name, scope)) {
      return scope;
    }
    scope = scope.parent;
  }
  throw new ArithReferenceError(
    `Symbol ${node.name} is not defined at (${node.start.line}:${node.start.col})`,
  );
};

const getValue = (node, env) => {
  const scope = lookup(node, env);
  return scope[Symbol.for(node.name)];
};

const getIdentifier = (node, env) => {
  if (Reflect.ownKeys(env).includes(Symbol.for(node.name))) {
    return Symbol.keyFor(Symbol.for(node.name));
  }
  throw new ArithReferenceError(
    `Symbol ${node.name} is not defined at (${node.start.line}:${node.start.col})`,
  );
};

const setValue = (name, value, env) => {
  const scope = lookup(name, env);
  if (!scope && env.parent) {
    throw new ArithReferenceError(
      `Cannot set undefined variable ${name}`,
    );
  }
  return (scope[Symbol.for(name)] = value);
};

const defVar = (name, value, env) => {
  return (env[Symbol.for(name)] = value);
};

const defName = (name, env) => {
  return env[Symbol.for(name)];
};

module.exports = {
  createEnv,
  setEnv,
  lookup,
  getValue,
  setValue,
  getIdentifier,
  defVar,
  defName,
};
