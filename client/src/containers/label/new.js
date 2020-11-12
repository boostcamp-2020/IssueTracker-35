import React, { useState, useRef, useReducer } from 'react';
import Label from '@/components/label';

import { labelAPI } from '@/api/label';

import styled from 'styled-components';
import { Button, Div, Input } from '@/styles/styled';
import color from '@/styles/colors';
import size from '@/styles/sizes';
import Random from '@/styles/svgs/random';
import { TOGGLE, ADD } from '@/store/label/actions';

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

const CancelButton = styled(Button)`
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

const LabelContainer = styled(FormContainer)`
  padding-left: 20px;
`;

const ColorBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const RandomButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ color }) => `#${color}`};
  width: 34px;
  height: 30px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 6px;
`;

const init = color => ({
  title: '',
  color,
  value: color,
});

const NewLabelConainer = ({ dispatch }) => {
  const [label, setLabel] = useState(init(color.RANDOM()));
  const contentRef = useRef();

  const handleTitle = ({ target }) => {
    const title = target.value;

    setLabel({
      title,
      color: label.color,
      value: label.value,
    });
  };

  const handleColor = ({ target }) => {
    const value = (target.value.length > 6 ? label : target).value;
    const validValue = color.isValid(value) ? value : label.color;
    setLabel({
      title: label.title,
      color: validValue,
      value,
    });
  };

  const handleRandom = () => {
    const value = color.RANDOM();
    return setLabel({ title: label.title, color: value, value });
  };

  const handleSubmit = async () => {
    const newLabel = {
      title: label.title,
      color: label.color,
      content: contentRef.current.value,
    };

    const {
      data: { id },
    } = await labelAPI.submitLabel(newLabel);
    newLabel.id = id;

    dispatch({ type: ADD, label: newLabel });
  };

  return (
    <Container>
      <LabelContainer>
        <Label label={label} height="30px" />
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
          <LabelInput ref={contentRef} placeholder="Description (optional)" />
        </DescriptionConainer>
        <ColorConainer>
          <StyledLabel>Color</StyledLabel>
          <ColorBody>
            <RandomButton color={label.color} onClick={handleRandom}>
              <Random backgroundColor={label.color} />
            </RandomButton>
            <LabelInput
              placeholder="color"
              onChange={handleColor}
              value={label.value}
            />
          </ColorBody>
        </ColorConainer>
        <ButtonContainer>
          <CancelButton onClick={() => dispatch({ type: TOGGLE })}>
            Cancel
          </CancelButton>
          <NewIssueButton onClick={handleSubmit}>Create label</NewIssueButton>
        </ButtonContainer>
      </FormContainer>
    </Container>
  );
};

export default NewLabelConainer;
