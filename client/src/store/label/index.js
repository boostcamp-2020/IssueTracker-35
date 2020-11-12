import React, { createContext, useEffect, useReducer, useContext } from 'react';
import { INIT } from '@/store/label/actions';
import { UserContext } from '@/store/user';
import { labelAPI } from '@/api/label';
import reducer from './reducer';

const initState = {
  labels: [],
  create: false,
};

const LabelContext = createContext();

const LabelProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);
  const {
    state: { user },
  } = useContext(UserContext);

  const getAllIssues = async () => {
    if (!user) return;

    const {
      data: { labels },
    } = await labelAPI.getAllLabels();

    dispatch({ type: INIT, labels });
  };

  useEffect(getAllIssues, [user]);

  return (
    <LabelContext.Provider value={{ state, dispatch }}>
      {children}
    </LabelContext.Provider>
  );
};

export { initState, LabelProvider, LabelContext };
