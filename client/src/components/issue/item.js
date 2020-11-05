import React, { useState } from 'react';
import IssueIcon from '@/styles/svgs/issue';

import getTimestamp from '@/utils/timestamp';

// TODO toggleSelected 미구현 상태, useCallback으로 미리 저장
const IssueItem = ({ issue, toggleSelected, now }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
    toggleSelected(issue.id);
  };

  return (
    <div>
      <div>
        <input
          type="checkbox"
          name="issues"
          value={issue.id}
          checked={checked}
          onChange={handleChange}
        />
        <IssueIcon is_open={issue.is_open} />
        <b>{issue.title}</b>
      </div>
      <div>
        <p>{`#${issue.id} ${issue.is_open
            ? `opened ${getTimestamp(now, issue.createdAt)} by ${issue.author.nickname
            }`
            : `by ${issue.author.nickname} was closed ${getTimestamp(
              now,
              issue.createdAt
            )}`
          }`}</p>
      </div>
    </div>
  );
};

export default IssueItem;
