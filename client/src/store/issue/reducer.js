import { TOGGLE, TOGGLE_ALL } from './actions';

export default (state, action) => {
  switch (action.type) {
    case TOGGLE:
      return {
        issues: state.issues,
        selected: state.selected,
        timestamp: new Date(),
      };
    default:
      throw new Error();
  }
};
