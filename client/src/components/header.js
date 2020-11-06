import React from 'react';
import styled from 'styled-components';
import color from '@/styles/colors';
import size from '@/styles/sizes';
import { Div } from '@/styles/styled';

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
  color: #fff;
  font-size: 1em;
  z-index: 2;
`;

const Logo = styled(Div.row)``;

const Header = () => {
  return (
    <StyledHeader>
      <Logo>ISSUES</Logo>
    </StyledHeader>
  );
};

export default Header;
