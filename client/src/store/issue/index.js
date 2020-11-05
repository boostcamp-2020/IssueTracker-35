import React, { createContext, useReducer } from 'react';

import reducer from './reducer';

const IssueListContext = createContext();

const initListState = {
  issues: [
    {
      id: 1,
      title: '첫 번째 이슈입니다.',
      content: '첫 번째 내용~~',
      is_open: true,
      createdAt: new Date('2020-09-02 17:00'),
      author: { nickname: '망했어요' },
      comment_count: 0,
    },
    {
      id: 2,
      title: '두 번째 이슈입니다.',
      content: '두 번째 내용~~',
      is_open: false,
      author: { nickname: '엉엉' },
      createdAt: new Date('2020-11-05 18:20'),
      comment_count: 2,
    },
    {
      id: 3,
      title: '세 번째 이슈입니다.',
      content: '세 번째 내용~~',
      is_open: true,
      author: { nickname: '퇴근 마렵다' },
      createdAt: new Date('2020-11-05 18:57'),
      comment_count: 3,
    },
  ],
  selected: [],
  timestamp: new Date(),
};

const IssueListProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initListState);

  return (
    <IssueListContext.Provider value={{ state, dispatch }}>
      {children}
    </IssueListContext.Provider>
  );
};

export { IssueListContext, IssueListProvider };
