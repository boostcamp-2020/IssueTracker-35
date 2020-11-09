import React from 'react';
import styled from 'styled-components';
import CogWheel from '@/styles/svgs/cogwheel';
import color from '@/styles/colors';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${color.LIGHT_GRAY};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${color.DARK_GRAY};

  &:hover {
    cursor: pointer;
    color: ${color.BLUE};
  }
`;

const Body = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 14px;
  margin: 0 0 10px 0;
`;

const Title = styled.p`
  font-weight: 600;
  font-size: 14px;
  margin: 10px 0;
`;

const SideBarItem = ({ title, content }) => {
  return (
    <Container>
      <Header>
        <Title>{title}</Title>
        <CogWheel />
      </Header>
      <Body>{content}</Body>
    </Container>
  );
};

export default SideBarItem;
