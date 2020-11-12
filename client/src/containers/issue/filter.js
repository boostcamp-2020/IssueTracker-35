import React, { useContext, useEffect, useRef } from 'react';
import IssueIcon from '@/styles/svgs/issueState';
import DropDown from '@/components/issue/dropdown';

import { IssueListContext } from '@/store/issue';
import { TOGGLE_ALL } from '@/store/issue/actions';

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

const FilterRight = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Filter = () => {
  const { state, dispatch } = useContext(IssueListContext);

  const boxRef = useRef();
  useEffect(() => {
    const selected = state.selected.size;
    const checkedAll = state.issues.length === state.selected.size;
    boxRef.current.checked = selected && checkedAll;
    boxRef.current.indeterminate = selected && !checkedAll;
  }, [state.selected]);

  const openCount = state.issues.filter(issue => issue.isOpen).length;
  const closedCount = state.issues.length - openCount;

  return (
    <Container>
      <FilterLeft>
        <Checkbox
          type="checkbox"
          onChange={() => dispatch({ type: TOGGLE_ALL })}
          ref={boxRef}
        ></Checkbox>
        <OpenOrClosedDiv>
          <IssueIcon isOpen={true} isSelected={true} />
          <State isSelected={true}>{openCount} Open</State>
        </OpenOrClosedDiv>
        <OpenOrClosedDiv>
          <IssueIcon isOpen={false} isSelected={false} />
          <State isSelected={false}>{closedCount} Closed</State>
        </OpenOrClosedDiv>
      </FilterLeft>
      <FilterRight>
        <DropDown name="Author" />
        <DropDown name="Label" />
        <DropDown name="Milestones" />
        <DropDown name="Assignee" />
      </FilterRight>
    </Container>
  );
};

export default Filter;
