import reducer from './reducer';

const initState = {
  assignees: new Set(),
  labels: new Set(),
  milestone: [],
};

export { initState, reducer };
