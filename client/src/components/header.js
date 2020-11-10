import React, { useContext } from 'react';
import styled from 'styled-components';
import color from '@/styles/colors';
import size from '@/styles/sizes';
import { Div } from '@/styles/styled';
import { Link } from 'react-router-dom';
import { UserContext } from '@/store/user';
import { LOGOUT } from '@/store/user/actions';

const StyledHeader = styled.header`
  background-color: ${color.LIGHT_BLACK};
  display: flex;
  width: 100%;
  height: ${size.HEADER_SIZE};
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.5);
  position: fixed;
  align-items: center;
  margin: 0;
  top: 0;
  color: ${color.WHITE};
  font-size: 1em;
  z-index: 2;
`;

const Logo = styled.button`
  position: absolute;
  background-color: transparent;
  color: ${color.WHITE};
  border: none;
  outline: none;
  cursor: pointer;
  left: 50%;
`;

const Logout = styled(Logo)`
  left: 90%;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
`;

const Header = () => {
  const {
    state: { user },
    dispatch,
  } = useContext(UserContext);

  const logoutHandler = () => {
    localStorage.removeItem('token');
    dispatch({ type: LOGOUT });
  };

  return (
    <StyledHeader>
      <StyledLink to="/">
        <Logo>ISSUES</Logo>
      </StyledLink>
      {user && <Logout onClick={logoutHandler}>LOGOUT</Logout>}
    </StyledHeader>
  );
};

export default Header;
