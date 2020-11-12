import React, { useState, useRef } from 'react';

import styled from 'styled-components';
import { Button, Div, Input } from '@/styles/styled';
import color from '@/styles/colors';
import size from '@/styles/sizes';

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 90%;
  margin: 1rem auto;
  padding-top: 1rem;
  border: 1px solid ${color.LIGHT_GRAY2};
  border-radius: 5px;
  background-color: ${color.THIN_GRAY};
`;

const FormContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;
`;

const ButtonContainer = styled.div`
  width: 25%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const NewIssueButton = styled(Button)``;

const EditButton = styled(Button)`
  background-color: ${color.GHOST_WHITE};
  color: ${color.DARK_GRAY};
  border: 1px solid ${color.LIGHT_GRAY};
  margin-right: 10px;
`;

const NameConainer = styled(Div.column)`
  width: 25%;
  align-items: start;
  padding: 10px;
`;

const DescriptionConainer = styled(NameConainer)`
  width: 33%;
  align-items: start;
`;

const LabelInput = styled(Input)`
  width: 100%;
  padding: 5px 12px;
  font-size: ${size.DEFAULT_FONT_SIZE};
  vertical-align: middle;
  border-radius: 5px;
`;

const Label = styled.label`
  font-weight: 700;
  font-size: ${size.DEFAULT_FONT_SIZE};
  margin-bottom: 10px;
`;

const NewLabelConainer = ({ state, dispatch }) => {
  return (
    <Container>
      <FormContainer>
        <NameConainer>
          <Label>Label name</Label>
          <LabelInput placeholder="Label name" />
        </NameConainer>
        <DescriptionConainer>
          <Label>Description</Label>
          <LabelInput placeholder="Description (optional)" />
        </DescriptionConainer>
        <ButtonContainer>
          <EditButton>Edit</EditButton>
          <NewIssueButton>New Issue</NewIssueButton>
        </ButtonContainer>
      </FormContainer>
    </Container>
  );
};

export default NewLabelConainer;
