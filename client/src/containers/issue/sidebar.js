import React, { useReducer, useContext, useEffect } from 'react';
import styled from 'styled-components';
import color from '@/styles/colors';
import size from '@/styles/sizes';
import { issueAPI } from '@/api/issue';
import Label from '@/components/label';

import Assignee from '@/components/issue/assignee';
import LabelList from '@/components/issue/label';
import SidebarItem from '@/components/issue/sidebarItem';
import { UserContext } from '@/store/user';
import { IssueListContext } from '@/store/issue';
import { FETCH } from '@/store/issue/actions';

import {
  UPDATE_ASSIGNEE,
  UPDATE_LABEL,
  UPDATE_MILESTONE,
} from '@/store/sidebar/actions';
import { reducer, initState } from '@/store/sidebar';
import { INIT } from '@/store/sidebar/actions';
import { compareKeyOfMap } from '@/utils/compare';

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

const ProfileImage = styled.img`
  object-fit: cover; /* Do not scale the image */
  object-position: center; /* Center the image within the element */
  margin-right: 5px;
  height: 20px;
  width: 20px;
  border-radius: 50%;
`;

const Nickname = styled.span`
  font-size: ${size.DEFAULT_FONT_SIZE};
`;

const AssigneeProfile = styled.div`
  display: flex;
  align-items: center;
`;

const AssigneeContainer = styled.div`
  display: flex;
  flex: 1 1;
  justify-content: flex-start;
  margin-bottom: 9px;
`;

const LabelContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 9px;
`;

const assigneeProps = (user, state, dispatch, handleAssigneesChange) => {
  const assignMyself = () =>
    dispatch({
      type: UPDATE_ASSIGNEE,
      assignees: new Map([[user.id, user]]),
    });

  return {
    headerText: 'Assign up to 10 People to this issue',
    title: 'Assignees',
    textContent: (
      <Content>
        No one--<Span onClick={assignMyself}>assign yourself</Span>
      </Content>
    ),
    handleChange: handleAssigneesChange,
    selected: state.assignees,
    component: Assignee,
    renderContent: Object.assign(
      user => (
        <AssigneeContainer key={user.id}>
          <AssigneeProfile>
            <ProfileImage src={user.image} />
            <Nickname>{user.nickname}</Nickname>
          </AssigneeProfile>
        </AssigneeContainer>
      ),
      { displayName: 'Assignee' }
    ),
  };
};

const labelProps = (state, handleLabelsChange) => ({
  headerText: 'Apply labels to this issue',
  title: 'Labels',
  textContent: 'None yet',
  handleChange: handleLabelsChange,
  selected: state.labels,
  component: LabelList,
  renderContent: Object.assign(
    label => (
      <LabelContainer key={label.id}>
        <Label label={label} />
      </LabelContainer>
    ),
    { displayName: 'Assignee' }
  ),
  isColumn: false,
});

const milestoneProps = (state, handleMilestoneChange) => ({
  headerText: 'Set milestone',
  title: 'Milestone',
  textContent: 'No milestone',
  handleChange: handleMilestoneChange,
  selected: state.milestone,
  component: Div,
  renderContent: () => undefined,
});

const WriteSidebar = ({ state, dispatch, user }) => {
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
        {...assigneeProps(user, state, dispatch, handleAssigneesChange)}
      />
      <SidebarItem {...labelProps(state, handleLabelsChange)} />
      <SidebarItem {...milestoneProps(state, handleMilestoneChange)} />
    </Container>
  );
};

const DetailSidebar = ({ issue }) => {
  const { state, dispatch } = useContext(IssueListContext);

  const {
    state: { user },
  } = useContext(UserContext);

  const [sidebarState, sidebarDispatch] = useReducer(reducer, initState);

  const initIssue = () => {
    if (issue) {
      sidebarDispatch({ type: INIT, issue });
    }
  };

  useEffect(initIssue, [issue]);

  const handleAssigneesChange = async checked => {
    const origin = sidebarState.assignees;
    const target = checked;

    if (compareKeyOfMap(origin, target)) return;

    const assignees = [...checked.keys()];

    const response = await issueAPI.changeAssignees(issue.id, assignees);

    if (!response) return alert('Assignee 업데이트에 실패하였습니다.');
    sidebarDispatch({ type: UPDATE_ASSIGNEE, assignees: target });
    dispatch({
      type: FETCH,
      issues: state.issues.map(originIssue =>
        originIssue.id === issue.id
          ? { ...originIssue, assignees: [...target.values()] }
          : originIssue
      ),
    });
  };

  const handleLabelsChange = async checked => {
    const origin = sidebarState.labels;
    const target = checked;

    if (compareKeyOfMap(origin, target)) return;

    const labels = [...target.keys()];

    const response = await issueAPI.changeLabels(issue.id, labels);

    if (!response) return alert('Label 업데이트에 실패하였습니다.');
    sidebarDispatch({ type: UPDATE_LABEL, labels: target });

    dispatch({
      type: FETCH,
      issues: state.issues.map(originIssue =>
        originIssue.id === issue.id
          ? { ...originIssue, labels: [...target.values()] }
          : originIssue
      ),
    });
  };

  const handleMilestoneChange = async checked => {
    sidebarDispatch({ type: UPDATE_MILESTONE, milestone: checked });
  };

  return (
    <Container>
      <SidebarItem
        {...assigneeProps(
          user,
          sidebarState,
          sidebarDispatch,
          handleAssigneesChange
        )}
      />
      <SidebarItem {...labelProps(sidebarState, handleLabelsChange)} />
      <SidebarItem {...milestoneProps(sidebarState, handleMilestoneChange)} />
    </Container>
  );
};

export { WriteSidebar, DetailSidebar };
