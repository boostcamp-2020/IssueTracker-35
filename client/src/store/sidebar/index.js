import reducer from './reducer';

const initState = {
  assignees: new Map(),
  labels: new Map(),
  milestone: [],
};

export { initState, reducer };
