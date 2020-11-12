import { NEW, ADD, CANCEL, INIT } from './actions';

export default (state, action) => {
  switch (action.type) {
    case NEW:
      return {
        labels: state.labels,
        create: true,
      };
    case CANCEL:
      return {
        labels: state.labels,
        create: false,
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
