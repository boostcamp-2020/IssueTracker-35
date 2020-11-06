import React, { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '@/containers/issue/sidebar';

import styled from 'styled-components';
import { Input, Button } from '@/styles/styled';
import { DebouncedInput as ContentInput } from '@/components/issue/input';
import { UserContext } from '@/store/user';
import color from '@/styles/colors';
import { IssueListContext } from '@/store/issue';
import { NEW_ISSUE } from '@/store/issue/actions';

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px;
`;

const InputContainer = styled.div`
  margin: 10px 35px 0 20px;
  flex: 1 1;
  border: 1px solid ${color.LIGHT_GRAY};
  border-radius: 7px;
  padding: 1rem;
`;

const ProfileImage = styled.img`
  object-fit: cover; /* Do not scale the image */
  object-position: center; /* Center the image within the element */
  margin: 10px;
  height: 100px;
  width: 100px;
`;

const TitleInput = styled(Input)`
  width: 99%;
  height: 2rem;
  margin-bottom: 1rem;
  font-size: 1rem;
`;

const SubmitButton = styled(Button)`
  font-size: 1rem;
`;

const CancelButton = styled(Button)`
  font-size: 1rem;
  background-color: transparent;
  color: ${color.DARK_GRAY};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const IssueWriteContainer = ({ history }) => {
  const titleRef = useRef();
  const contentRef = useRef();

  const {
    state: { user },
  } = useContext(UserContext);
  const { state, dispatch } = useContext(IssueListContext);

  const handleSubmit = async () => {
    const title = titleRef.current.value;
    const content = contentRef.current.value;

    const issue = {
      id: Math.floor(Math.random() * 100000 + 5),
      title,
      content,
      is_open: true,
      author: { nickname: user.nickname },
      createdAt: new Date(),
      comment_count: 1,
    };

    // await issueAPI.submitIssue();
    dispatch({ type: NEW_ISSUE, issue });
    history.push('/issues');
  };

  return (
    <Container>
      <ProfileImage src={user?.image} alt="" />
      <InputContainer>
        <TitleInput placeholder="Title" type="text" ref={titleRef} />
        <ContentInput contentRef={contentRef} />
        <ButtonContainer>
          <Link to="/issues">
            <CancelButton>Cancel</CancelButton>
          </Link>
          <SubmitButton onClick={handleSubmit}>Submit new issue</SubmitButton>
        </ButtonContainer>
      </InputContainer>
      <Sidebar />
    </Container>
  );
};

export default IssueWriteContainer;
