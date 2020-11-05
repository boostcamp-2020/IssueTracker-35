import React, { useContext } from 'react';

import { IssueListContext } from '@/store/issue';
import IssueItem from '@/components/issue/item';

// TODO : comment
const IssueListContainer = () => {
  const { state, dispatch } = useContext(IssueListContext);

  return (
    <div>
      {state.issues.map(issue => (
        <IssueItem
          key={issue.id}
          issue={issue}
          toggleSelected={console.log}
          now={state.timestamp}
        ></IssueItem>
      ))}
    </div>
  );
};

export default IssueListContainer;
