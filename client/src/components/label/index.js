import React from 'react';
import styled from 'styled-components';
import color from '@/styles/colors';

const Container = styled.div`
  background-color: ${({ labelColor }) => `#${labelColor}`};
  display: flex;
  align-items: center;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 2rem;
  padding: 1px 7px;
  margin-right: 5px;
  height: ${({ height }) => height};
`;

const Title = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${({ isBlack }) => (isBlack ? color.BLACK : color.WHITE)};
`;

const Label = ({ label, height = 'auto', isBlack = true }) => {
  return (
    <>
      <Container height={height} labelColor={label.color}>
        <Title isBlack={isBlack}>{label.title}</Title>
      </Container>
    </>
  );
};

export default Label;
