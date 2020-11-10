import React, { createContext, useEffect, useReducer } from 'react';

import { issueListReducer, issueWriteReducer } from './reducer';

const IssueListContext = createContext();

const initListState = {
  issues: [],
  selected: [],
  timestamp: new Date(),
};

const IssueListProvider = ({ children }) => {
  const [state, dispatch] = useReducer(issueListReducer, initListState);

  return (
    <IssueListContext.Provider value={{ state, dispatch }}>
      {children}
    </IssueListContext.Provider>
  );
};

const IssueWriteContext = createContext();

const initWriteState = {
  title: '',
  content: '',
  assignees: [],
  labels: [],
  milestone: [],
};

const IssueWriteProvider = ({ children }) => {
  const [state, dispatch] = useReducer(issueWriteReducer, initWriteState);

  return (
    <IssueWriteContext.Provider value={{ state, dispatch }}>
      {children}
    </IssueWriteContext.Provider>
  );
};

export {
  IssueListContext,
  IssueWriteContext,
  IssueListProvider,
  IssueWriteProvider,
};
