import React from 'react';
import color from '@/styles/colors';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import getTimestamp from '@/utils/timestamp';
import { Input, Button } from '@/styles/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin: 0 auto 1rem auto;
  padding: 1rem;
  border-bottom: 1px solid ${color.LIGHT_GRAY};
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const IssueTitle = styled.div`
  display: flex;
`;

const Title = styled.span`
  font-size: 2rem;
  margin: 1rem 0.5rem 1rem 0;
  font-weight: 400;
`;

const IssueId = styled.span`
  margin: 1rem 0;
  font-size: 2rem;
  font-weight: 400;
  color: ${color.GRAY};
`;

const DescriptionContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  align-items: center;
`;

const Description = styled.span`
  color: ${color.DARK_GRAY};
`;

const Author = styled.span`
  font-weight: 600;
  margin-right: 5px;
  color: ${color.DARK_GRAY};
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const NewIssueButton = styled(Button)``;

const EditButton = styled(Button)`
  background-color: ${color.GHOST_WHITE};
  color: ${color.DARK_GRAY};
  border: 1px solid ${color.LIGHT_GRAY};
  margin-right: 10px;
`;

const IssueState = styled.div`
  background-color: ${({ isOpen }) =>
    isOpen ? color.LIGHT_GREEN : color.DARK_RED};
  color: ${color.WHITE};
  border: none;
  border-radius: 20px;
  padding: 6px 12px;
  margin-right: 6px;
`;

const IssueDetailHeader = ({ issue }) => {
  const describe = issue =>
    `opened this issue ${getTimestamp(new Date(), issue.createdAt)} · ${issue.commentCount || 0
    } comments`;

  return (
    <Container>
      <TitleContainer>
        <IssueTitle>
          <Title>{issue.title}</Title>
          <IssueId>#{issue.id}</IssueId>
        </IssueTitle>
        <ButtonContainer>
          <EditButton>Edit</EditButton>
          <NewIssueButton>New Issue</NewIssueButton>
        </ButtonContainer>
      </TitleContainer>
      <DescriptionContainer>
        <IssueState isOpen={issue.is_open}>
          {issue.is_open ? 'Open' : 'Closed'}
        </IssueState>
        <Author>{issue.author.nickname}</Author>
        <Description>{describe(issue)}</Description>
      </DescriptionContainer>
    </Container>
  );
};

export default IssueDetailHeader;
