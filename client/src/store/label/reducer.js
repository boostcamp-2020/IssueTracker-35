import { TOGGLE, ADD, INIT } from './actions';

export default (state, action) => {
  switch (action.type) {
    case TOGGLE:
      return {
        labels: state.labels,
        create: !state.create,
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
