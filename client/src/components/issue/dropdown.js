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

const DropDown = ({ name }) => {
  return <DropDownButton>{name} &#9662;</DropDownButton>;
};

export default DropDown;
