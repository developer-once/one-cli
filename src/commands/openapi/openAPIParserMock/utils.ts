function isObject(obj: any): boolean {
  return !!obj && typeof obj === 'object';
}

function objectify(thing: any): object {
  if (!isObject(thing)) return {};
  return thing;
}

function get(entity: any, path: (string | number)[]) {
  let current = entity;

  for (let i = 0; i < path.length; i += 1) {
    if (current === null || current === undefined) {
      return undefined;
    }

    current = current[path[i]];
  }

  return current;
}

function normalizeArray(arr: any[]): any[] {
  if (Array.isArray(arr)) return arr;
  return [arr];
}

function isFunc(thing: any): boolean {
  return typeof thing === 'function';
}

function inferSchema(thing: any): any {
  if (thing.schema) {
    return thing.schema;
  }

  if (thing.properties) {
    return {
      ...thing,
      type: 'object',
    };
  }

  return thing;
}

export { isObject, get, objectify, isFunc, inferSchema, normalizeArray };
