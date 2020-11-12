import React, { useState, useRef } from 'react';
import Label from '@/components/label';

import styled from 'styled-components';
import { Button, Div, Input } from '@/styles/styled';
import color from '@/styles/colors';
import size from '@/styles/sizes';

const Container = styled.div`
  display: flex;
  flex-direction: column;
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
  align-items: flex-end;
  justify-content: flex-end;
  margin-bottom: 10px;
`;

const NewIssueButton = styled(Button)``;

const EditButton = styled(Button)`
  background-color: ${color.GHOST_WHITE};
  color: ${color.DARK_GRAY};
  border: 1px solid ${color.LIGHT_GRAY};
  margin-right: 5px;
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

const ColorConainer = styled(NameConainer)`
  width: 16%;
  align-items: start;
  padding: 10px;
`;

const LabelInput = styled(Input)`
  width: 100%;
  padding: 5px 12px;
  font-size: ${size.DEFAULT_FONT_SIZE};
  vertical-align: middle;
  border-radius: 5px;
`;

const StyledLabel = styled.label`
  font-weight: 700;
  font-size: ${size.DEFAULT_FONT_SIZE};
  margin-bottom: 10px;
`;

const LabelContainer = styled(FormContainer)``;

const NewLabelConainer = ({ state, dispatch }) => {
  const [label, setLabel] = useState({
    title: '',
    description: '',
    color: '#',
  });

  const handleTitle = ({ target }) => {
    setLabel({
      title: target.value,
      description: label.description,
      color: label.color,
    });
  };

  const handleColor = ({ target }) => {
    setLabel({
      title: label.name,
      description: label.description,
      color: target.value,
    });
  };

  return (
    <Container>
      <LabelContainer>
        <Label label={label} />
      </LabelContainer>
      <FormContainer>
        <NameConainer>
          <StyledLabel>Label name</StyledLabel>
          <LabelInput
            placeholder="Label name"
            onChange={handleTitle}
            value={label.title}
          />
        </NameConainer>
        <DescriptionConainer>
          <StyledLabel>Description</StyledLabel>
          <LabelInput placeholder="Description (optional)" />
        </DescriptionConainer>
        <ColorConainer>
          <StyledLabel>Color</StyledLabel>
          <LabelInput
            placeholder="color"
            onChange={handleColor}
            value={label.color}
          />
        </ColorConainer>
        <ButtonContainer>
          <EditButton>Edit</EditButton>
          <NewIssueButton>New Issue</NewIssueButton>
        </ButtonContainer>
      </FormContainer>
    </Container>
  );
};

export default NewLabelConainer;
