const createEnv = (parent) => Object.create(parent ? parent : null);

const setEnv = (obj) => {
  const env = createEnv();

  for (key of Object.keys(obj)) {
    env[Symbol.for(key)] = obj[key];
  }

  return env;
};

const getValue = (node, env) => {
  if (env[Symbol.for(node.name)]) {
    return env[Symbol.for(node.name)];
  }

  throw new ReferenceError(`${node.name} is not defined`);
};

const getIdentifier = (node, env) => {
  if (Reflect.ownKeys(env).includes(Symbol.for(node.name))) {
    return Symbol.keyFor(Symbol.for(node.name));
  }
};

module.exports = { setEnv, getValue, getIdentifier };
