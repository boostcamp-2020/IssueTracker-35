export const compareKeyOfMap = (origin, target) =>
  origin.size === target.size &&
  [...origin.keys()].every(key => target.has(key));
