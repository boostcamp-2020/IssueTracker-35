import React, { useState } from 'react';
import styled from 'styled-components';
import CogWheel from '@/styles/svgs/cogwheel';
import color from '@/styles/colors';
import Modal from '@/components/issue/modal';

const Container = styled.div`
  position: relative;
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

const SideBarItem = ({ headerText, title, content, children }) => {
  const [isVisible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <Container>
      <Header onClick={showModal}>
        <Title>{title}</Title>
        <CogWheel />
      </Header>
      <Body>{content}</Body>
      <Modal title={headerText} visible={isVisible} hideModal={hideModal}>
        {children}
      </Modal>
    </Container>
  );
};

export default SideBarItem;
