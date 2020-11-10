import {
  FETCH,
  CHECK,
  UNCHECK,
  TOGGLE_ALL,
  NEW_ISSUE,
  OPEN_ISSUES,
  CLOSE_ISSUES,
} from './actions';

const issueListReducer = (state, action) => {
  switch (action.type) {
    case FETCH:
      return {
        issues: action.issues,
        selected: state.selected,
        timestamp: new Date(),
      };
    case CHECK:
      return {
        issues: state.issues,
        selected: [...state.selected, action.issueId],
        timestamp: state.timestamp,
      };
    case UNCHECK:
      return {
        issues: state.issues,
        selected: state.selected.filter(issue => issue.id !== action.issueId),
        timestamp: state.timestamp,
      };
    case TOGGLE_ALL:
      return {
        issues: state.issues,
        selected: state.selected.length
          ? []
          : state.issues.map(issue => issue.id),
        timestamp: state.timestamp,
      };
    case NEW_ISSUE:
      return {
        issues: [action.issue, ...state.issues],
        selected: state.selected,
        timestamp: new Date(),
      };
    case OPEN_ISSUES:
      if (action.issueId)
        return {
          issues: state.issues.map(issue =>
            issue.id === action.issueId ? { ...issue, isOpen: true } : issue
          ),
          selected: state.selected,
          timestamp: new Date(),
        };
      return {
        issues: state.issues.map(issue =>
          state.selected.indexOf(issue.id) !== -1
            ? { ...issue, isOpen: true }
            : issue
        ),
        selected: [],
        timestamp: new Date(),
      };
    case CLOSE_ISSUES:
      if (action.issueId)
        return {
          issues: state.issues.map(issue =>
            issue.id === action.issueId ? { ...issue, isOpen: false } : issue
          ),
          selected: state.selected,
          timestamp: new Date(),
        };
      return {
        issues: state.issues.map(issue =>
          state.selected.indexOf(issue.id) !== -1
            ? { ...issue, isOpen: false }
            : issue
        ),
        selected: [],
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

export { issueListReducer, issueWriteReducer };
