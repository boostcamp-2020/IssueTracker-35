import React from 'react';
import styled from 'styled-components';
import SidebarItem from '@/components/issue/sidebarItem';

const Container = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
`;

const Sidebar = () => {
  return (
    <Container>
      <SidebarItem title={'Assignees'} content={'No one-assign yourself'} />
      <SidebarItem title={'Labels'} content={'None yet'} />
      <SidebarItem title={'Milestone'} content={'No milestone'} />
    </Container>
  );
};

export default Sidebar;
