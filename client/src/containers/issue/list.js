import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IssueListContext } from '@/store/issue';
import IssueItem from '@/components/issue/item';
import Filter from '@/containers/issue/filter';
import SearchContainer from '@/containers/issue/search';
import styled from 'styled-components';
import color from '@/styles/colors';

const Container = styled.div`
  max-width: 1280px;
  margin-right: auto;
  margin-left: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ListHeader = styled.div`
  width: 90%;
  display: flex;
  height: 100px;
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

const IssueListContainer = () => {
  const { state, dispatch } = useContext(IssueListContext);

  const toggleSelected = (issueId, checked) =>
    dispatch({
      type: checked ? 'UNCHECK' : 'CHECK',
      issueId,
    });

  return (
    <Container>
      <ListHeader>
        <SearchContainer />
      </ListHeader>
      <ListBody>
        <Filter></Filter>
        <ItemList>
          {state.issues.map(issue => (
            <IssueItem
              key={issue.id}
              issue={issue}
              d
              checked={state.selected.has(issue.id)}
              toggleSelected
              now={state.timestamp}
            ></IssueItem>
          ))}
        </ItemList>
      </ListBody>
    </Container>
  );
};

export default IssueListContainer;
