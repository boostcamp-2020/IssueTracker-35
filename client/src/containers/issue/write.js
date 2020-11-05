import React from 'react';
import SideBar from '@/components/sideBar';
import { DebouncedInput } from '@/components/issue/input';

const IssueWriteContainer = () => {
  return (
    <>
      <DebouncedInput />
      <SideBar />
    </>
  );
};

export default IssueWriteContainer;
