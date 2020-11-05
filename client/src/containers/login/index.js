import React from 'react';
import styled from 'styled-components';
import { gitHubLoginAPI } from '@/api/user';
import { Div, Button, Input } from '@/styles/styled';
import Logo from '@/styles/svgs/logo';
import colors from '@/styles/colors';

const Container = styled(Div.column)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, calc(-50% - 25px));
`;
const Title = styled.h2`
  height: 50px;
  margin: 0;
`;
const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 1rem;
  background-color: #fff;
`;
const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 7px;
  min-width: 200px;
`;
const Label = styled.label`
  font-size: 0.8rem;
  font-weight: 500;
  padding: 5px;
`;
const FormSignDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  padding-bottom: 15px;
`;
const SignButton = styled(Button)`
  background-color: transparent;
  color: ${colors.LIGHT_BLUE};
`;
const GitHubButton = styled.button`
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: grey;
  border: none;
  border-radius: 3px;
  min-width: 200px;
`;
const P = styled.p`
  color: white;
  margin: 2px 5px;
`;

const LoginContainer = () => {
  const githubLoginHandler = async () => {
    const {
      data: { url },
    } = await gitHubLoginAPI.getUrl();

    location.href = url;
  };

  return (
    <Container>
      <Title>이슈 트래커</Title>
      <LoginForm>
        <FormContent>
          <Label>아이디</Label>
          <Input type="text"></Input>
        </FormContent>
        <FormContent>
          <Label>비밀번호</Label>
          <Input type="password"></Input>
        </FormContent>
        <FormSignDiv>
          <SignButton>로그인</SignButton>
          <SignButton>회원가입</SignButton>
        </FormSignDiv>
        <GitHubButton type="button" onClick={githubLoginHandler}>
          <P>Sign in with GitHub</P>
          <Logo />
        </GitHubButton>
      </LoginForm>
    </Container>
  );
};

export default LoginContainer;
