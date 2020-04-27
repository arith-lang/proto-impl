const setEnv = (obj) => {
  const env = Object.create(null);

  for (key of Object.keys(obj)) {
    env[Symbol.for(key)] = obj[key];
  }

  return env;
};

const getIdentifier = (node, env) => {
  if (env[Symbol.for(node.name)]) {
    return env[Symbol.for(node.name)];
  }

  throw new ReferenceError(`${node.name} is not defined`);
};

module.exports = { setEnv, getIdentifier };
