import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import color from '@/styles/colors';
import CheckMark from '@/styles/svgs/check';
import { labelAPI } from '@/api/label';

const Container = styled.div`
  width: 100%;
  border-top: 1px solid ${color.LIGHT_GRAY2};
  display: flex;
  align-items: center;
  &:hover {
    background-color: ${color.BLUE};
    color: ${color.WHITE};
  }
`;

const LabelContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ColorTitlte = styled.div`
  display: flex;
  align-items: center;
`;

const Color = styled.div`
  background-color: ${({ labelColor }) => `#${labelColor}`};
  margin: 5px 8px;
  height: 15px;
  width: 15px;
  border-radius: 50%;
`;

const Title = styled.span`
  font-size: 12px;
`;

const Content = styled.span`
  font-size: 12px;
  margin: 0 0 5px 8px;
`;

const Label = ({ checked, setChecked }) => {
  const [labels, setLabels] = useState([]);

  const getLabels = async () => {
    const {
      data: { labels },
    } = await labelAPI.getAllLabels();

    setLabels(labels);
  };

  useEffect(getLabels, []);

  const handleCheck = (isChecked, label) => {
    if (isChecked) {
      const newChecked = new Map(checked);
      newChecked.delete(label.id);
      return setChecked(newChecked);
    }
    setChecked(new Map([...checked, [label.id, label]]));
  };

  return (
    <>
      {labels.map(label => {
        const isChecked = checked.has(label.id);
        return (
          <Container
            key={label.id}
            onClick={() => handleCheck(isChecked, label)}
          >
            <CheckMark isChecked={isChecked} />
            <LabelContainer>
              <ColorTitlte>
                <Color labelColor={label.color} />
                <Title>{label.title}</Title>
              </ColorTitlte>
              <Content>{label.content}</Content>
            </LabelContainer>
          </Container>
        );
      })}
    </>
  );
};

export default Label;
