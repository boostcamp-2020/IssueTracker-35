import React from 'react';
import styled from 'styled-components';
import Assignee from '@/components/issue/assignee';
import SidebarItem from '@/components/issue/sidebarItem';

const Container = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
`;

const assignees = [
  {
    id: 1,
    nickname: 'aaa',
    image:
      'https://avatars0.githubusercontent.com/u/49153756?s=460&u=a475983d60adb9ddac3d55771bde039d545360dd&v=4',
  },
  {
    id: 2,
    nickname: 'bbb',
    image:
      'https://avatars0.githubusercontent.com/u/49153756?s=460&u=a475983d60adb9ddac3d55771bde039d545360dd&v=4',
  },
  {
    id: 3,
    nickname: 'ccc',
    image:
      'https://avatars0.githubusercontent.com/u/49153756?s=460&u=a475983d60adb9ddac3d55771bde039d545360dd&v=4',
  },
  {
    id: 4,
    nickname: 'dds',
    image:
      'https://avatars0.githubusercontent.com/u/49153756?s=460&u=a475983d60adb9ddac3d55771bde039d545360dd&v=4',
  },
];

// TODO 상태관리
const Sidebar = () => {
  return (
    <Container>
      <SidebarItem
        headerText="Assign up to 10 People to this issue"
        title="Assignees"
        content="No one-assign yourself"
      >
        <Assignee assignees={assignees} />
      </SidebarItem>

      <SidebarItem
        headerText="Apply labels to this issue"
        title="Labels"
        content="None yet"
      />
      <SidebarItem
        headerText="Set milestone"
        title="Milestone"
        content="No milestone"
      />
    </Container>
  );
};

export default Sidebar;
