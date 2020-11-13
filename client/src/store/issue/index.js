import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { issueAPI } from '@/api/issue';
import { FETCH } from '@/store/issue/actions';
import { issueListReducer, issueWriteReducer } from './reducer';
import { UserContext } from '@/store/user';

const IssueListContext = createContext();

const initListState = {
  issues: [],
  selected: new Set(),
  timestamp: new Date(),
};

const IssueListProvider = ({ children }) => {
  const {
    state: { user },
  } = useContext(UserContext);

  const [state, dispatch] = useReducer(issueListReducer, initListState);

  const getAllIssues = async () => {
    if (!user) return;

    const {
      data: { issues },
    } = await issueAPI.getAllIssues();

    dispatch({ type: FETCH, issues });
  };

  useEffect(getAllIssues, [user]);

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
