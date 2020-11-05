import React, { useState } from 'react';
import styled from 'styled-components';

import IssueIcon from '@/styles/svgs/issue';
import getTimestamp from '@/utils/timestamp';

const Checkbox = styled.input``;
const Title = styled.b``;
const Description = styled.p``;

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
        <Checkbox
          type="checkbox"
          name="issues"
          value={issue.id}
          checked={checked}
          onChange={handleChange}
        />
        <IssueIcon is_open={issue.is_open} />
        <Title>{issue.title}</Title>
      </div>
      <div>
        <Description>{`#${issue.id} ${issue.is_open
            ? `opened ${getTimestamp(now, issue.createdAt)} by ${issue.author.nickname
            }`
            : `by ${issue.author.nickname} was closed ${getTimestamp(
              now,
              issue.createdAt
            )}`
          }`}</Description>
      </div>
    </div>
  );
};

export default IssueItem;
