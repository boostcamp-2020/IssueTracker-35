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
  color: ${({ labelColor }) => `#${color.getBackgroundTextColor(labelColor)}`};
`;

const Label = ({ label, height = 'auto' }) => {
  return (
    <>
      <Container height={height} labelColor={label.color}>
        <Title labelColor={label.color}>{label.title || 'Label Preview'}</Title>
      </Container>
    </>
  );
};

export default Label;
