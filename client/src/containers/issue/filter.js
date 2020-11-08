import React from 'react';
import IssueIcon from '@/styles/svgs/issueState';

import styled from 'styled-components';
import color from '@/styles/colors';

const Container = styled.div`
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

const OpenOrClosedDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  margin-right: 1rem;
`;

const State = styled.p`
  margin: 3px 0 0 5px;
  font-size: 15px;
  white-space: nowrap;
  color: ${({ isSelected }) => (isSelected ? color.BLACK : color.LIGHT_BLACK)};
  font-weight: ${({ isSelected }) => (isSelected ? '600' : '400')};
`;

const Checkbox = styled.input`
  margin-right: 1rem;
`;

const FilterLeft = styled.div`
  width: 60%;
  display: flex;
  justify-content: flex-start;
  align-content: center;
  padding: 0 0 0 5px;
`;

const FilterRight = styled.div``;

const Filter = () => {
  const openCount = 2;
  const closedCount = 1;

  return (
    <Container>
      <FilterLeft>
        <Checkbox type="checkbox"></Checkbox>
        <OpenOrClosedDiv>
          <IssueIcon isOpen={true} isSelected={true} />
          <State isSelected={true}>{openCount} Open</State>
        </OpenOrClosedDiv>
        <OpenOrClosedDiv>
          <IssueIcon isOpen={false} isSelected={false} />
          <State isSelected={false}>{closedCount} Closed</State>
        </OpenOrClosedDiv>
      </FilterLeft>
      <FilterRight></FilterRight>
    </Container>
  );
};

export default Filter;
