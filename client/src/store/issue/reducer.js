import { TOGGLE, NEW_ISSUE } from './actions';

const issueListReducer = (state, action) => {
  switch (action.type) {
    case TOGGLE:
      return {
        issues: state.issues,
        selected: state.selected,
        timestamp: new Date(),
      };
    case NEW_ISSUE:
      return {
        issues: [action.issue, ...state.issues],
        selected: state.selected,
        timestamp: new Date(),
      };
    default:
      throw new Error();
  }
};

const issueWriteReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

// TODO : selected 변경
export { issueListReducer, issueWriteReducer };
