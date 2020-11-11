import React, { useReducer, useContext } from 'react';
import styled from 'styled-components';
import color from '@/styles/colors';
// import { issueAPI } from '@/api/issue';

import Assignee from '@/components/issue/assignee';
import SidebarItem from '@/components/issue/sidebarItem';
import { UserContext } from '@/store/user';
import {
  UPDATE_ASSIGNEE,
  UPDATE_LABEL,
  UPDATE_MILESTONE,
} from '@/store/sidebar/actions';
import { reducer } from '@/store/sidebar';

const Container = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
`;

const Div = styled.div``;

const Span = styled.span`
  &:hover {
    color: ${color.BLUE};
    cursor: pointer;
  }
`;

const Content = styled.div`
  display: flex;
`;

const WriteSidebar = ({ state, dispatch }) => {
  const handleAssigneesChange = checked => {
    dispatch({ type: UPDATE_ASSIGNEE, assignees: checked });
  };

  const handleLabelsChange = checked => {
    dispatch({ type: UPDATE_LABEL, labels: checked });
  };

  const handleMilestoneChange = checked => {
    dispatch({ type: UPDATE_MILESTONE, milestone: checked });
  };

  return (
    <Container>
      <SidebarItem
        headerText="Assign up to 10 People to this issue"
        title="Assignees"
        content="No one-assign yourself"
        handleChange={handleAssigneesChange}
        selected={state.assignees}
        component={Assignee}
      ></SidebarItem>
      <SidebarItem
        headerText="Apply labels to this issue"
        title="Labels"
        content="None yet"
        handleChange={handleLabelsChange}
        selected={state.labels}
        component={Div}
      />
      <SidebarItem
        headerText="Set milestone"
        title="Milestone"
        content="No milestone"
        handleChange={handleMilestoneChange}
        selected={state.milestone}
        component={Div}
      />
    </Container>
  );
};

const init = issue => ({
  assignees: new Map(issue?.assignees.map(assignee => [assignee.id, assignee])),
  labels: new Map(issue?.labels.map(label => [label.id, label])),
  milestone: issue?.milestone?.id,
});

const DetailSidebar = ({ issue }) => {
  const [state, dispatch] = useReducer(reducer, issue, init);
  const {
    state: { user },
  } = useContext(UserContext);

  const handleAssigneesChange = async checked => {
    try {
      // await issueAPI.changeAssignees(issue.id, assignees);
      dispatch({ type: UPDATE_ASSIGNEE, assignees: checked });
    } catch (err) {
      alert('Assignee 업데이트에 실패하였습니다.');
    }
  };

  const handleLabelsChange = async checked => {
    try {
      // await issueAPI.changeAssignees(issue.id, assignees);
      dispatch({ type: UPDATE_LABEL, labels: checked });
    } catch (err) {
      alert('Label 업데이트에 실패하였습니다.');
    }
  };

  const handleMilestoneChange = async checked => {
    try {
      // await issueAPI.changeAssignees(issue.id, assignees);
      dispatch({ type: UPDATE_MILESTONE, milestone: checked });
    } catch (err) {
      alert('Milestone 업데이트에 실패할 때까지 구현이 될까요?');
    }
  };

  const assignMyself = () =>
    dispatch({
      type: UPDATE_ASSIGNEE,
      assignees: new Map([[user.id, user]]),
    });

  return (
    <Container>
      <SidebarItem
        headerText="Assign up to 10 People to this issue"
        title="Assignees"
        content={
          <Content>
            No one--<Span onClick={assignMyself}>assign yourself</Span>
          </Content>
        }
        handleChange={handleAssigneesChange}
        selected={state.assignees}
        component={Assignee}
      ></SidebarItem>
      <SidebarItem
        headerText="Apply labels to this issue"
        title="Labels"
        content="None yet"
        handleChange={handleLabelsChange}
        selected={state.labels}
        component={Div}
      />
      <SidebarItem
        headerText="Set milestone"
        title="Milestone"
        content="No milestone"
        handleChange={handleMilestoneChange}
        selected={state.milestone}
        component={Div}
      />
    </Container>
  );
};

export { WriteSidebar, DetailSidebar };
