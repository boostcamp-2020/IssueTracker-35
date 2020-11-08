import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { IssueListContext } from '@/store/issue';
import IssueItem from '@/components/issue/item';
import Filter from '@/containers/issue/filter';
import { Button } from '@/styles/styled';
import styled from 'styled-components';
import color from '@/styles/colors';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ListHeader = styled.div`
  width: 90%;
  display: flex;
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

const NewIssueButton = styled(Button)`
  font-size: 1rem;
  margin: 10px;
`;

// TODO : comment
const IssueListContainer = () => {
  const { state, dispatch } = useContext(IssueListContext);

  return (
    <Container>
      <ListHeader>
        <Link to="/issues/new">
          <NewIssueButton>New issue</NewIssueButton>
        </Link>
      </ListHeader>
      <ListBody>
        <Filter></Filter>
        <ItemList>
          {state.issues.map(issue => (
            <IssueItem
              key={issue.id}
              issue={issue}
              toggleSelected={console.log}
              now={state.timestamp}
            ></IssueItem>
          ))}
        </ItemList>
      </ListBody>
    </Container>
  );
};

export default IssueListContainer;
