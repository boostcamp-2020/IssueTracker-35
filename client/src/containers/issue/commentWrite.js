import React, { useContext, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { Button } from '@/styles/styled';
import { DebouncedInput as ContentInput } from '@/components/issue/input';
import { UserContext } from '@/store/user';
import color from '@/styles/colors';

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  border-top: 2px solid ${color.LIGHT_GRAY};
  margin-top: 2rem;
  padding-top: 1rem;
`;

const InputContainer = styled.div`
  margin: 10px 35px 0 20px;
  width: 100%;
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

const SubmitButton = styled(Button)`
  opacity: ${({ isAble }) => (isAble ? '1' : '0.5')};
`;

const CloseIssueButton = styled(Button)`
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

const CommentWriteContainer = () => {
  const [isAble, setAble] = useState(false);
  const contentRef = useRef();

  const {
    state: { user },
  } = useContext(UserContext);

  const notify = value => {
    if (isAble === !value) setAble(!isAble);
  };

  return (
    <Container>
      <ProfileImage src={user?.image} alt="" />
      <InputContainer>
        <TabContainer>
          <TabButton>Write</TabButton>
        </TabContainer>
        <ContentInput contentRef={contentRef} notify={notify} />
        <ButtonContainer>
          <Link to="/issues">
            <CloseIssueButton>Cancel</CloseIssueButton>
          </Link>
          <SubmitButton isAble={isAble} disabled={!isAble}>
            Comment
          </SubmitButton>
        </ButtonContainer>
      </InputContainer>
    </Container>
  );
};

export default CommentWriteContainer;
