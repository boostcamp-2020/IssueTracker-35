import React, { createContext, useReducer } from 'react';

const IssueContext = createContext();

const reducer = (state, action) => {
  return state;
};

const initState = {};

const IssueProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <IssueContext.Provider value={{ state, dispatch }}>
      {children}
    </IssueContext.Provider>
  );
};

export { IssueContext, IssueProvider };
