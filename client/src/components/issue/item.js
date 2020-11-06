import React, { useState } from 'react';
import styled from 'styled-components';
import color from '@/styles/colors';

import IssueIcon from '@/styles/svgs/issue';
import CommentIcon from '@/styles/svgs/comment';
import getTimestamp from '@/utils/timestamp';

const Checkbox = styled.input``;
const Title = styled.b``;
const Description = styled.p``;
const IssueBody = styled.div`
  display: flex;
  align-item: center;
`;
const IssueHeader = styled.div`
  display: flex;
  align-item: center;
`;

const Container = styled.div`
  border: 1px solid ${color.GRAY};
  border-top: none;
  display: flex;
  flex-direction: column;
`;

// TODO toggleSelected 미구현 상태, useCallback으로 미리 저장
const IssueItem = ({ issue, toggleSelected, now }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
    toggleSelected(issue.id);
  };

  return (
    <Container>
      <IssueHeader>
        <Checkbox
          type="checkbox"
          name="issues"
          value={issue.id}
          checked={checked}
          onChange={handleChange}
        />
        <IssueIcon is_open={issue.is_open} />
        <Title>{issue.title}</Title>
      </IssueHeader>
      <IssueBody>
        <Description>{`#${issue.id} ${issue.is_open
            ? `opened ${getTimestamp(now, issue.createdAt)} by ${issue.author.nickname
            }`
            : `by ${issue.author.nickname} was closed ${getTimestamp(
              now,
              issue.createdAt
            )}`
          }`}</Description>
        {!!issue.comment_count && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <CommentIcon />
            <p>{issue.comment_count}</p>
          </div>
        )}
      </IssueBody>
    </Container>
  );
};

export default IssueItem;
