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
    /* const {
       data: { users },
    } = await userAPI.getAllUsers(); */

    setUsers(initState);
  };

  useEffect(getUsers, []);

  const handleCheck = (isChecked, userId) => {
    if (isChecked) {
      const newChecked = new Set(checked);
      newChecked.delete(userId);
      return setChecked(newChecked);
    }
    setChecked(new Set([...checked, userId]));
  };

  return (
    <>
      {users.map(user => {
        const isChecked = checked.has(user.id);
        return (
          <Container
            key={user.id}
            onClick={() => handleCheck(isChecked, user.id)}
          >
            <CheckMark isChecked={isChecked} />
            <ProfileImage src={user.image} />
            <Nickname>{user.nickname}</Nickname>
          </Container>
        );
      })}
    </>
  );
};

const initState = [
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
  {
    id: 5,
    nickname: 'aaa',
    image:
      'https://avatars0.githubusercontent.com/u/49153756?s=460&u=a475983d60adb9ddac3d55771bde039d545360dd&v=4',
  },
  {
    id: 7,
    nickname: 'bbb',
    image:
      'https://avatars0.githubusercontent.com/u/49153756?s=460&u=a475983d60adb9ddac3d55771bde039d545360dd&v=4',
  },
  {
    id: 8,
    nickname: 'ccc',
    image:
      'https://avatars0.githubusercontent.com/u/49153756?s=460&u=a475983d60adb9ddac3d55771bde039d545360dd&v=4',
  },
  {
    id: 6,
    nickname: 'dds',
    image:
      'https://avatars0.githubusercontent.com/u/49153756?s=460&u=a475983d60adb9ddac3d55771bde039d545360dd&v=4',
  },
];

export default Assignee;
