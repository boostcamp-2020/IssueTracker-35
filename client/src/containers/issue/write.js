import React from 'react';
import SideBar from '@/components/sideBar';
import { DebouncedInput } from '@/components/input';

const IssueWriteContainer = () => {
  return (
    <>
      <DebouncedInput />
      <SideBar />
    </>
  );
};

export default IssueWriteContainer;
