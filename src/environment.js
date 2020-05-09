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

const lookup = (name, env) => {
  let scope = env;
  while (scope) {
    if (scope[Symbol.for(name)]) {
      return scope;
    }
    scope = scope.parent;
  }
};

const getValue = (node, env) => {
  if (
    env[Symbol.for(node.name)] ||
    env[Symbol.for(node.name)] === 0 ||
    env[Symbol.for(node.name)] === false ||
    env[Symbol.for(node.name)] === null ||
    env[Symbol.for(node.name)] === ""
  ) {
    return env[Symbol.for(node.name)];
  }

  throw new ReferenceError(`${node.name} is not defined`);
};

const getIdentifier = (node, env) => {
  if (Reflect.ownKeys(env).includes(Symbol.for(node.name))) {
    return Symbol.keyFor(Symbol.for(node.name));
  }
};

const setValue = (name, value, env) => {
  const scope = lookup(name, env);
  if (!scope && env.parent) {
    throw new ReferenceError(`Cannot set undefined variable ${name}`);
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
