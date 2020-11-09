import React, { useState } from 'react';
import styled from 'styled-components';
import color from '@/styles/colors';
import { Button } from '@/styles/styled';

const DropDownButton = styled(Button)`
  background-color: transparent;
  color: ${color.DARK_GRAY};
  border: none;
  text-align: center;
`;

// TODO: 출력할 목록을 서버에서 조회하고 출력해야 함
const DropDown = ({ name }) => {
  return <DropDownButton>{name} &#9662;</DropDownButton>;
};

export default DropDown;
