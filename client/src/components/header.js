import React from 'react';
import styled from 'styled-components';
import color from '@/styles/colors';
import size from '@/styles/sizes';
import { Div } from '@/styles/styled';
import { Link } from 'react-router-dom';

const StyledHeader = styled.header`
  background-color: ${color.LIGHT_BLACK};
  display: flex;
  width: 100%;
  height: ${size.HEADER_SIZE};
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.5);
  position: fixed;
  align-items: center;
  justify-content: center;
  margin: 0;
  top: 0;
  color: ${color.WHITE};
  font-size: 1em;
  z-index: 2;
`;

const Logo = styled.button`
  background-color: transparent;
  color: ${color.WHITE};
  border: none;
  outline: none;
  cursor: pointer;
`;

const Header = () => {
  return (
    <StyledHeader>
      <Link to="/">
        <Logo>ISSUES</Logo>
      </Link>
    </StyledHeader>
  );
};

export default Header;
