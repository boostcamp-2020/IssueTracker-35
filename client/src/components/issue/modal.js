import React, { useState } from 'react';
import styled from 'styled-components';
import color from '@/styles/colors';
import { Div } from '@/styles/styled';

const Overlay = styled.div`
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const Container = styled(Div.column)`
  display: block;
  position: absolute;
  top: 30px;
  background-color: ${color.WHITE};
  width: 100%;
  font-size: 12px;
  border: 1px solid ${color.LIGHT_GRAY2};
  border-radius: 6px;
  box-shadow: 0 3px 12px ${color.GRAY};
  z-index: 1000;
`;

const ItemContainer = styled(Div.column)`
  justify-content: flex-start;
  background-color: ${color.WHITE};
  max-height: 300px;
  width: 100%;
  border: none;
  cursor: pointer;
  overflow: auto;
  border-radius: 0 0 6px 6px;
`;

const Title = styled.div`
  width: 100%;
  height: auto;
  font-weight: 600;
  padding: 10px;
  align-items: center;
  border-bottom: 1px solid ${color.LIGHT_GRAY2};
  background-color: ${color.WHITE};
  border-radius: 6px 6px 0 0;
`;

const Modal = ({ title, hideModal, selected, component }) => {
  const Component = component;
  const [checked, setChecked] = useState(selected);

  return (
    <>
      <Overlay onClick={() => hideModal(checked)} />
      <Container>
        <Title>{title}</Title>
        <ItemContainer>
          <Component checked={checked} setChecked={setChecked} />
        </ItemContainer>
      </Container>
    </>
  );
};

export default Modal;
