import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import color from '@/styles/colors';
import { Button, Input, Div } from '@/styles/styled';
import Glasses from '@/styles/svgs/glasses';
import LabelIcon from '@/styles/svgs/label';
import MilestoneIcon from '@/styles/svgs/milestone';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  height: 1rem;
`;

const FilterContainer = styled.div`
  display: flex;
  width: 100%;
`;

const FilterButton = styled.button`
  border: 1px solid ${color.LIGHT_GRAY2};
  border-right: none;
  border-radius: 5px 0 0 5px;
  height: 30px;
  padding: 5px 16px;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;
  &:hover {
    background-color: ${color.LIGHT_GRAY};
  }
`;

const SearchInput = styled(Input)`
  border: 1px solid ${color.LIGHT_GRAY2};
  border-radius: 0 5px 5px 0;
  height: 30px;
  width: 100%;
  padding-left: 2rem;
`;

const GlassesIcon = styled(Glasses)``;

const ButtonContainer = styled(Div.row)`
  margin: 0px 1rem;
`;

const LabelButton = styled(FilterButton)`
  background-color: transparent;
`;

const MileStoneButton = styled(FilterButton)`
  background-color: transparent;
  border-radius: 0 5px 5px 0;
  border: 1px solid ${color.LIGHT_GRAY2};
`;

const NewIssueButton = styled(Button)`
  font-size: 14px;
  padding: 5px 16px;
  white-space: nowrap;
  height: 30px;
`;

const SearchContainer = () => {
  return (
    <Container>
      <FilterContainer>
        <FilterButton>Filters &#9662;</FilterButton>
        <SearchInput />
        <GlassesIcon />
      </FilterContainer>
      <ButtonContainer>
        <LabelButton>
          <LabelIcon />
          Labels
        </LabelButton>
        <MileStoneButton>
          <MilestoneIcon />
          Milestones
        </MileStoneButton>
      </ButtonContainer>
      <Link to="/issues/new">
        <NewIssueButton>New issue</NewIssueButton>
      </Link>
    </Container>
  );
};

export default SearchContainer;
