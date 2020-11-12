import React from 'react';
import styled from 'styled-components';
import color from '@/styles/colors';
import size from '@/styles/sizes';
import { Button } from '@/styles/styled';

import Label from '@/components/label';

const Container = styled.div`
  position: relative;
  border-top: 1px solid ${color.LIGHT_GRAY2};
  display: flex;
  &:hover {
    background-color: ${color.THIN_GRAY};
  }
`;

const Description = styled.p`
  font-size: ${size.DEFAULT_FONT_SIZE};
`;

const LabelCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 55%;
`;

const LabelLeft = styled.div`
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-left: 1rem;
`;

const LabelRight = styled.div`
  display: flex;
  padding: 10px;
  justify-content: flex-end;
  align-items: start;
  width: 25%;
`;

const EditButton = styled(Button)`
  background-color: transparent;
  color: ${color.DARK_GRAY};
`;

const DeleteButton = styled(EditButton)``;

const LabelItem = ({ label }) => {
  return (
    <Container>
      <LabelLeft>
        <Label height="30px" label={label} />
      </LabelLeft>

      <LabelCenter>
        <Description>{label.content}</Description>
      </LabelCenter>

      <LabelRight>
        <EditButton>Edit</EditButton>
        <DeleteButton>Delete</DeleteButton>
      </LabelRight>
    </Container>
  );
};

export default React.memo(LabelItem);
