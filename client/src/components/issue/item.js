import React, { useState } from 'react';
import styled from 'styled-components';
import color from '@/styles/colors';
import size from '@/styles/sizes';

import IssueIcon from '@/styles/svgs/issue';
import CommentIcon from '@/styles/svgs/comment';
import getTimestamp from '@/utils/timestamp';

const Container = styled.div`
  border-top: 1px solid ${color.LIGHT_GRAY2};
  display: flex;
  &:hover {
    background-color: ${color.THIN_GRAY};
  }
`;

const Checkbox = styled.input`
  margin-right: 1rem;
`;
const Title = styled.b`
  cursor: pointer;
  &:hover {
    color: ${color.BLUE};
  }
`;

const Description = styled.p`
  margin: 0;
  font-size: ${size.DEFAULT_FONT_SIZE};
`;

const IssueCenter = styled.div`
  display: flex;
  align-item: center;
  padding: 5px 0;
  flex-direction: column;
  justify-content: flex-start;
  width: 70%;
`;

const IssueBody = styled.div`
  display: flex;
  align-item: center;
  padding: 5px;
`;

const IssueHeader = styled.div`
  display: flex;
  align-item: center;
  padding: 3px 5px;
  justify-content: space-between;
`;

const IssueLeft = styled.div`
  display: flex;
  align-item: center;
  justify-content: flex-start;
  padding: 10px 0 0 5px;
`;

const IssueRight = styled.div`
  display: flex;
  padding: 10px;
  justify-content: space-between;
  align-items: start;
  width: 30%;
`;

const Comment = styled.div`
  display: flex;
  align-items: center;
`;

const CommentCount = styled.p`
  margin: 0 3px;
`;

// TODO toggleSelected 미구현 상태, useCallback으로 미리 저장
const IssueItem = ({ issue, toggleSelected, now }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
    toggleSelected(issue.id);
  };

  const describe = issue =>
    `#${issue.id} ${issue.is_open
      ? `opened ${getTimestamp(now, issue.createdAt)} by ${issue.author.nickname
      }`
      : `by ${issue.author.nickname} was closed ${getTimestamp(
        now,
        issue.createdAt
      )}`
    }`;

  return (
    <Container>
      <IssueLeft>
        <Checkbox
          type="checkbox"
          name="issues"
          value={issue.id}
          checked={checked}
          onChange={handleChange}
        />
        <IssueIcon isOpen={issue.is_open} />
      </IssueLeft>

      <IssueCenter>
        <IssueHeader>
          <Title>{issue.title}</Title>
        </IssueHeader>
        <IssueBody>
          <Description>{describe(issue)}</Description>
        </IssueBody>
      </IssueCenter>

      <IssueRight>
        {!!issue.comment_count && (
          <Comment>
            <CommentIcon />
            <CommentCount>{issue.comment_count}</CommentCount>
          </Comment>
        )}
      </IssueRight>
    </Container>
  );
};

export default IssueItem;
