import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import color from '@/styles/colors';
import size from '@/styles/sizes';
import CheckMark from '@/styles/svgs/check';
import { userAPI } from '@/api/user';

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

const Assignee = ({ checked, setChecked }) => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const {
      data: { users },
    } = await userAPI.getAllUsers();

    setUsers(users);
  };

  useEffect(getUsers, []);

  const handleCheck = (isChecked, user) => {
    if (isChecked) {
      const newChecked = new Map(checked);
      newChecked.delete(user.id);
      return setChecked(newChecked);
    }
    setChecked(new Map([...checked, [user.id, user]]));
  };

  return (
    <>
      {users.map(user => {
        const isChecked = checked.has(user.id);
        return (
          <Container key={user.id} onClick={() => handleCheck(isChecked, user)}>
            <CheckMark isChecked={isChecked} />
            <ProfileImage src={user.image} />
            <Nickname>{user.nickname}</Nickname>
          </Container>
        );
      })}
    </>
  );
};

export default Assignee;
