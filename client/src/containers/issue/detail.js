import React, { useContext } from 'react';
import { IssueListContext } from '@/store/issue';
import { Link } from 'react-router-dom';
import Sidebar from '@/containers/issue/sidebar';
import IssueDetailHeader from '@/containers/issue/detailHeader';
import Comment from '@/components/issue/comment';
import CommentWriteContainer from '@/containers/issue/commentWrite';
import styled from 'styled-components';
import { Input, Button } from '@/styles/styled';
import color from '@/styles/colors';

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
  // TODO 서버에서 해당 issue id로 이슈 정보를 조회해야 함
  const {
    state: { issues },
  } = useContext(IssueListContext);

  const issue = issues.find(issue => +match.params.issueId === issue.id);

  return (
    <Container>
      {issue && <IssueDetailHeader issue={issue} />}
      <ContentContainer>
        <CommentContainer>
          <Comment issue={issue} />
          <CommentWriteContainer />
        </CommentContainer>
        <Sidebar />
      </ContentContainer>
    </Container>
  );
};

export default IssueDetailContainer;
