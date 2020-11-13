import reducer from './reducer';

const initState = {
  assignees: new Map(),
  labels: new Map(),
  milestone: undefined,
};

export { initState, reducer };
