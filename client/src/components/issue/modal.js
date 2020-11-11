import React from 'react';
import styled from 'styled-components';
import color from '@/styles/colors';
import { Div } from '@/styles/styled';

const Overlay = styled.div`
  display: 'block';
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const Container = styled(Div.column)`
  display: 'block';
  position: absolute;
  top: 30px;
  background-color: ${color.WHITE};
  width: 300px;
  max-height: 500px;
  font-size: 12px;
  border: 1px solid ${color.LIGHT_GRAY2};
  border-radius: 6px;
  box-shadow: 0 3px 12px ${color.GRAY};
  z-index: 1000;
  overflow: scroll;
  cursor: pointer;
`;

const Title = styled.div`
  width: 100%;
  font-weight: 600;
  padding: 10px;
  align-items: center;
  background-color: ${color.WHITE};
`;

// TODO: 출력할 목록을 서버에서 조회하고 출력해야 함
const Modal = ({ title, isVisible = false, hideModal, children }) => {
  return (
    <>
      {isVisible && (
        <>
          <Overlay onClick={hideModal} />
          <Container>
            <Title>{title}</Title>
            {children}
          </Container>
        </>
      )}
    </>
  );
};

export default Modal;
