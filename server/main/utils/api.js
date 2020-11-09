exports.convertObjectKeys = object => {
  return (oldKey, newKey) => {
    Object.defineProperty(
      object.dataValues,
      newKey,
      Object.getOwnPropertyDescriptor(object.dataValues, oldKey)
    );
    delete object.dataValues[oldKey];
  };
};
