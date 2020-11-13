import {
  INIT,
  UPDATE_ASSIGNEE,
  UPDATE_LABEL,
  UPDATE_MILESTONE,
} from './actions';

export default (state, action) => {
  switch (action.type) {
    case INIT:
      return {
        assignees: new Map(
          action.issue.assignees?.map(assignee => [assignee.id, assignee])
        ),
        labels: new Map(action.issue.labels?.map(label => [label.id, label])),
        milestone: action.issue.milestone,
      };
    case UPDATE_ASSIGNEE:
      return {
        assignees: action.assignees,
        labels: state.labels,
        milestone: state.milestone,
      };
    case UPDATE_LABEL:
      return {
        assignees: state.assignees,
        labels: action.labels,
        milestone: state.milestone,
      };
    case UPDATE_MILESTONE:
      return {
        assignees: state.assignees,
        labels: state.labels,
        milestone: action.milestone,
      };
    default:
      throw new Error();
  }
};
