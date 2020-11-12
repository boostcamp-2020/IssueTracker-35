import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import LabelIcon from '@/styles/svgs/label';
import MilestoneIcon from '@/styles/svgs/milestone';
import { Button, Div } from '@/styles/styled';
import { initState, LabelContext } from '@/store/label';

import NewLabelConainer from '@/containers/label/new';
import LabelItem from '@/components/label/item';
import styled from 'styled-components';
import color from '@/styles/colors';
import size from '@/styles/sizes';
import { TOGGEL } from '../../store/label/actions';

const Container = styled.div`
  max-width: 1280px;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ListHeader = styled.div`
  width: 90%;
  display: flex;
  height: 100px;
  justify-content: space-between;
  align-items: center;
`;

const ListBody = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
`;

const ItemList = styled.div`
  border: 1px solid ${color.LIGHT_GRAY2};
  border-top: none;
  border-radius: 0 0 5px 5px;
`;

const ButtonContainer = styled(Div.row)``;

const LabelButton = styled.button`
  background-color: ${color.BLUE};
  border: 1px solid ${color.LIGHT_GRAY2};
  color: ${color.WHITE};
  border-right: none;
  border-radius: 5px 0 0 5px;
  height: 30px;
  padding: 5px 16px;
  font-size: ${size.DEFAULT_FONT_SIZE};
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;
`;

const MileStoneButton = styled(LabelButton)`
  background-color: transparent;
  color: ${color.BLACK};
  border-radius: 0 5px 5px 0;
  border: 1px solid ${color.LIGHT_GRAY2};
  &:hover {
    background-color: ${color.LIGHT_GRAY};
  }
`;

const ItemHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${color.LIGHT_GRAY2};
  border-bottom: none;
  border-radius: 5px 5px 0 0;
  height: 50px;
  background-color: ${color.THIN_GRAY};
`;

const NewIssueButton = styled(Button)`
  font-size: ${size.DEFAULT_FONT_SIZE};
  padding: 5px 16px;
  white-space: nowrap;
  height: 30px;
`;

const LabelCount = styled.p`
  margin: 0 0 0 1.5rem;
  font-size: 15px;
  white-space: nowrap;
  color: ${color.BLACK};
  font-weight: 600;
`;

const LabelListContainer = () => {
  const { state, dispatch } = useContext(LabelContext);

  const handleToggle = () => {
    dispatch({ type: TOGGEL, create: !state.create });
  };

  return (
    <Container>
      <ListHeader>
        <ButtonContainer>
          <Link to="/labels">
            <LabelButton>
              <LabelIcon isWhite={true} />
              Labels
            </LabelButton>
          </Link>
          <MileStoneButton>
            <MilestoneIcon />
            Milestones
          </MileStoneButton>
        </ButtonContainer>
        <NewIssueButton onClick={handleToggle}>New label</NewIssueButton>
      </ListHeader>
      {state.create && <NewLabelConainer />}
      <ListBody>
        <ItemHeader>
          <LabelCount>{state.labels.length} labels</LabelCount>
        </ItemHeader>
        <ItemList>
          {state.labels.map(label => (
            <LabelItem key={label.id} label={label} />
          ))}
        </ItemList>
      </ListBody>
    </Container>
  );
};

export default LabelListContainer;
