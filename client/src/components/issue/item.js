import React from 'react';
import styled from 'styled-components';
import color from '@/styles/colors';
import size from '@/styles/sizes';
import { Link } from 'react-router-dom';

import Label from '@/components/label';
import IssueIcon from '@/styles/svgs/issue';
import CommentIcon from '@/styles/svgs/comment';
import getTimestamp from '@/utils/timestamp';

const Container = styled.div`
  position: relative;
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
  text-decoration: none;
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
  width: 75%;
`;

const IssueBody = styled.div`
  display: flex;
  align-item: center;
  padding: 3px;
`;

const IssueHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 3px 5px;
  justify-content: flex-start;
`;

const IssueLeft = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 10px 0 0 5px;
`;

const IssueRight = styled.div`
  display: flex;
  padding: 10px;
  justify-content: flex-end;
  align-items: start;
  width: 25%;
`;

const AssigneeImages = styled.img`
  object-fit: cover;
  object-position: center;
  margin-right: 5px;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  position: absolute;
  top: 0px;
  left: ${({ distance }) => distance}px;
`;

const AssigneeContainer = styled.div`
  position: relative;
  right: 55px;
  display: flex;
  width: 30px;
  align-items: center;
`;

const Comment = styled.div`
  display: flex;
  width: 30px;
  align-items: center;
`;

const CommentCount = styled.p`
  margin: 0 3px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${color.BLACK};
`;

const LabelContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-left: 10px;
`;

const IssueItem = ({ issue, checked, toggleSelected, now }) => {
  const describe = () =>
    `#${issue.id} ${issue.isOpen
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
          onChange={() => toggleSelected(issue.id, checked)}
        />
        <IssueIcon isOpen={issue.isOpen} />
      </IssueLeft>

      <IssueCenter>
        <IssueHeader>
          <StyledLink to={`/issues/${issue.id}`}>
            <Title>{issue.title}</Title>
          </StyledLink>
          <LabelContainer>
            {issue.labels.map(label => (
              <Label key={label.id} label={label} />
            ))}
          </LabelContainer>
        </IssueHeader>
        <IssueBody>
          <Description>{describe()}</Description>
        </IssueBody>
      </IssueCenter>

      <IssueRight>
        <AssigneeContainer>
          {issue.assignees?.map((assignee, idx) =>
            idx < 5 ? (
              <AssigneeImages
                key={assignee.id}
                src={assignee.image}
                distance={idx * 10}
              />
            ) : undefined
          )}
        </AssigneeContainer>
        <Comment>
          {!!issue.commentCount && (
            <>
              <CommentIcon />
              <CommentCount>{issue.commentCount}</CommentCount>
            </>
          )}
        </Comment>
      </IssueRight>
    </Container>
  );
};

export default React.memo(IssueItem);
