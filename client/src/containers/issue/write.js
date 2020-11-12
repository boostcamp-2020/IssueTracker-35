import React, { useContext, useRef, useState, useReducer } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { Input, Button } from '@/styles/styled';
import color from '@/styles/colors';

import { DebouncedInput as ContentInput } from '@/components/issue/input';
import { WriteSidebar } from '@/containers/issue/sidebar';

import { UserContext } from '@/store/user';
import { IssueListContext } from '@/store/issue';
import { NEW_ISSUE } from '@/store/issue/actions';
import { reducer, initState } from '@/store/sidebar';

import { issueAPI } from '@/api/issue';
import CheckMark from '../../styles/svgs/check';

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px;
  max-width: 1280px;
  margin-right: auto;
  margin-left: auto;
`;

const InputContainer = styled.div`
  margin: 10px 35px 0 20px;
  flex: 1 1;
  border: 1px solid ${color.LIGHT_GRAY};
  border-radius: 7px;
  padding: 10px;
`;

const ProfileImage = styled.img`
  object-fit: cover; /* Do not scale the image */
  object-position: center; /* Center the image within the element */
  margin: 10px;
  height: 40px;
  width: 40px;
`;

const TitleInput = styled(Input)`
  width: 100%;
  height: 2rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  padding: 5px 12px;
  background-color: ${color.THIN_GRAY};
`;

const SubmitButton = styled(Button)`
  opacity: ${({ isAble }) => (isAble ? '1' : '0.5')};
`;

const CancelButton = styled(Button)`
  background-color: transparent;
  color: ${color.DARK_GRAY};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TabContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid ${color.LIGHT_GRAY};
  margin: 10px 0;
`;

const TabButton = styled(Button)`
  background-color: transparent;
  color: ${color.DARK_GRAY};
  border: 1px solid ${color.LIGHT_GRAY};
  border-bottom: 1px solid ${color.WHITE};
  border-radius: 3px 3px 0 0;
`;

const IssueWriteContainer = ({ history }) => {
  const [sidebarState, sidebarDispatch] = useReducer(reducer, initState);

  const [isAble, setAble] = useState(false);
  const titleRef = useRef();
  const contentRef = useRef();

  const {
    state: { user },
  } = useContext(UserContext);
  const { dispatch } = useContext(IssueListContext);

  const handleSubmit = async () => {
    const title = titleRef.current.value;
    const content = contentRef.current.value;

    const issue = {
      title,
      content,
      assignees: [...sidebarState.assignees.keys()],
      labels: [...sidebarState.labels.keys()],
      milestone: sidebarState.milestone,
    };

    const {
      data: { id },
    } = await issueAPI.submitIssue(issue);

    dispatch({
      type: NEW_ISSUE,
      issue: {
        ...issue,
        id,
        commentCount: 0,
        createdAt: new Date(),
        isOpen: true,
        author: { nickname: user.nickname },
      },
    });

    history.push('/issues');
  };

  const handleChange = ({ target }) => {
    if (isAble === !target.value) setAble(!isAble);
  };

  return (
    <Container>
      <ProfileImage src={user?.image} alt="" />
      <InputContainer>
        <TitleInput
          onChange={handleChange}
          placeholder="Title"
          type="text"
          ref={titleRef}
        />
        <TabContainer>
          <TabButton>Write</TabButton>
        </TabContainer>
        <ContentInput contentRef={contentRef} />
        <ButtonContainer>
          <Link to="/issues">
            <CancelButton>Cancel</CancelButton>
          </Link>
          <SubmitButton
            isAble={isAble}
            onClick={handleSubmit}
            disabled={!isAble}
          >
            Submit new issue
          </SubmitButton>
        </ButtonContainer>
      </InputContainer>
      <WriteSidebar
        state={sidebarState}
        dispatch={sidebarDispatch}
        user={user}
      />
    </Container>
  );
};

export default IssueWriteContainer;
