import { INPUT_CONTENT, SHOW_COUNT, CLEAR_COUNT } from './actions';

export default (state, action) => {
  switch (action.type) {
    case INPUT_CONTENT:
      return {
        timerId: action.timerId,
        value: action.value,
        visible: false,
      };
    case SHOW_COUNT:
      return {
        timerId: action.timerId,
        value: state.value,
        visible: true,
      };
    case CLEAR_COUNT:
      return {
        timerId: 0,
        value: state.value,
        visible: false,
      };
    default:
      throw new Error();
  }
};
