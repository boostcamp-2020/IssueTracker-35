import React, { useEffect, useState } from 'react';
import { DetailSidebar } from '@/containers/issue/sidebar';
import IssueDetailHeader from '@/containers/issue/detailHeader';
import Comment from '@/components/issue/comment';
import CommentWriteContainer from '@/containers/issue/commentWrite';
import styled from 'styled-components';
import { issueAPI } from '@/api/issue';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px;
  max-width: 1280px;
  margin-right: auto;
  margin-left: auto;
`;

const ContentContainer = styled.div`
  display: flex;
  width: 100%;
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
`;

const IssueDetailContainer = ({ match }) => {
  const [issue, setIssue] = useState(undefined);

  const getIssue = async () => {
    const {
      data: { issue },
    } = await issueAPI.getIssue(match.params.issueId);

    setIssue(issue);
  };

  useEffect(getIssue, []);

  return (
    <Container>
      {issue && <IssueDetailHeader issue={issue} />}
      <ContentContainer>
        <CommentContainer>
          {issue?.comments?.map(comment => (
            <Comment key={comment.id} comment={comment} author={issue.author} />
          ))}

          <CommentWriteContainer issue={issue} setIssue={setIssue} />
        </CommentContainer>
        <DetailSidebar issue={issue} />
      </ContentContainer>
    </Container>
  );
};

export default React.memo(
  IssueDetailContainer,
  (prev, next) => prev.match.url === next.match.url
);
