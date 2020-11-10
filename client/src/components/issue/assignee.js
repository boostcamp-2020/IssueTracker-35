import React, { useState } from 'react';
import styled from 'styled-components';
import color from '@/styles/colors';
import size from '@/styles/sizes';
import CheckedSvg from '@/styles/svgs/check';

const Container = styled.div`
  width: 100%;
  border-top: 1px solid ${color.LIGHT_GRAY2};
  display: flex;
  align-items: center;
  &:hover {
    background-color: ${color.BLUE};
    color: ${color.WHITE};
  }
`;

const ProfileImage = styled.img`
  object-fit: cover; /* Do not scale the image */
  object-position: center; /* Center the image within the element */
  margin: 10px;
  height: 20px;
  width: 20px;
  border-radius: 50%;
`;

const Nickname = styled.span`
  font-size: ${size.DEFAULT_FONT_SIZE};
`;

const CheckMark = styled(CheckedSvg)`
  display: none;
`;

const Assignee = ({ assignees }) => {
  return (
    <>
      {assignees.map(assignee => (
        <Container key={assignee.id}>
          <CheckMark />
          <ProfileImage src={assignee.image} />
          <Nickname>{assignee.nickname}</Nickname>
        </Container>
      ))}
    </>
  );
};

export default Assignee;
