import React from 'react';
import styled from 'styled-components';
import color from '@/styles/colors';
import SideBarItem from '@/components/SideBarItem';

const Container = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
`;

const SideBar = () => {
  return (
    <Container>
      <SideBarItem title={'Assignees'} content={'No one-assign yourself'} />
      <SideBarItem title={'Labels'} content={'None yet'} />
      <SideBarItem title={'Milestone'} content={'No milestone'} />
    </Container>
  );
};

export default SideBar;
