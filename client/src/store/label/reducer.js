import { TOGGEL, ADD, INIT } from './actions';

export default (state, action) => {
  switch (action.type) {
    case TOGGEL:
      return {
        labels: state.labels,
        create: action.create,
      };
    case ADD:
      return {
        labels: [...state.labels, action.label],
        create: false,
      };
    case INIT:
      return {
        labels: action.labels,
        create: false,
      };
    default:
      throw new Error();
  }
};
