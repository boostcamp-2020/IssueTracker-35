import React, { useRef, useState } from 'react';
import color from '@/styles/colors';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import getTimestamp from '@/utils/timestamp';
import { Button, Input } from '@/styles/styled';
import { issueAPI } from '@/api/issue';

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
  justify-content: flex-end;
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

const EditContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
`;

const EditInput = styled(Input)`
  width: 100%;
  height: 2rem;
  font-size: 1rem;
  margin-right: 1rem;
  padding: 5px 12px;
  background-color: ${color.THIN_GRAY};
`;

const CancelButton = styled(Button)`
  background-color: transparent;
  color: ${color.LIGHT_BLUE};
`;

const SaveButton = styled(EditButton)`
  margin-right: 0;
  opacity: ${({ isAble }) => (isAble ? 1 : 0.5)};
`;

const IssueDetailHeader = ({ issue }) => {
  const [isEdit, setEdit] = useState(false);
  const [title, setTitle] = useState(issue.title);
  const [isAble, setAble] = useState(true);

  const handleEdit = () => setEdit(!isEdit);

  const handleChange = ({ target }) => {
    setTitle(target.value);
    setAble(!!target.value);
  };

  const updateTitle = async () => {
    // const res = await issueAPI.updateTitle(issue.id, title);
    // if (!res) alert('수정에 실패했습니다.');

    setEdit(false);
  };

  const describe = issue =>
    `opened this issue ${getTimestamp(new Date(), issue.createdAt)} · ${issue.comments?.length || 0
    } comments`;

  return (
    <Container>
      {isEdit ? (
        <EditContainer>
          <EditInput value={title} onChange={handleChange} />
          <ButtonContainer>
            <SaveButton
              onClick={updateTitle}
              isAble={isAble}
              disabled={!isAble}
            >
              Save
            </SaveButton>
            <CancelButton onClick={handleEdit}>Cancel</CancelButton>
          </ButtonContainer>
        </EditContainer>
      ) : (
          <TitleContainer>
            <IssueTitle>
              <Title>{title}</Title>
              <IssueId>#{issue.id}</IssueId>
            </IssueTitle>
            <ButtonContainer>
              <EditButton onClick={handleEdit}>Edit</EditButton>
              <Link to="/issues/new">
                <NewIssueButton>New Issue</NewIssueButton>
              </Link>
            </ButtonContainer>
          </TitleContainer>
        )}

      <DescriptionContainer>
        <IssueState isOpen={issue.isOpen}>
          {issue.isOpen ? 'Open' : 'Closed'}
        </IssueState>
        <Author>{issue.author}</Author>
        <Description>{describe(issue)}</Description>
      </DescriptionContainer>
    </Container>
  );
};

export default IssueDetailHeader;
