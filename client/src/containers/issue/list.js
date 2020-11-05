import React, { useContext } from 'react';

import { IssueContext } from '@/store/issue';
import IssueItem from '@/components/issue/item';

const IssueListContainer = () => {
  const { state, dispatch } = useContext(IssueContext);

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
