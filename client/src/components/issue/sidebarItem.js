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
`;

const Title = styled.p`
  font-weight: 500;
  font-size: 1rem;
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
