import React, { useEffect, useReducer } from 'react';
import styled from 'styled-components';
import color from '@/styles/colors';
import { Textarea } from '@/styles/styled';

import { initState, reducer } from '@/store/comment';
import {
  INPUT_CONTENT,
  SHOW_COUNT,
  CLEAR_COUNT,
} from '@/store/comment/actions';

const DELAY = 2000;

const Container = styled.div`
  position: relative;
`;

const ContentInput = styled(Textarea)`
  width: 100%;
  resize: vertical;
  height: 200px;
  margin-bottom: 10px;
  font-size: 14px;
  padding: 8px;
`;

const Count = styled.p`
  position: absolute;
  width: 100%;
  font-size: 0.9rem;
  font-weight: 500;
  color: ${color.GRAY};
  text-align: right;
  bottom: 10px;
  right: 10px;
`;

const DebouncedInput = ({ contentRef }) => {
  const [state, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    return () => state.timerId && clearTimeout(state.timerId);
  }, []);

  const showCallback = () => {
    dispatch({
      type: SHOW_COUNT,
      timerId: setTimeout(dispatch, DELAY, {
        type: CLEAR_COUNT,
      }) /* set timer for CLEAR_COUNT */,
    });
  };

  const handleChange = event => {
    if (state.timerId)
      clearTimeout(state.timerId); /* debounce INPUT, or cancel CLEAR_COUNT */
    const value = event.target.value;
    dispatch({
      type: INPUT_CONTENT,
      timerId:
        value.length /* do not set timeout if input is empty */ &&
        setTimeout(showCallback, DELAY) /* set timer for SHOW_COUNT */,
      value,
    });
  };

  return (
    <Container>
      <ContentInput
        placeholder="Leave a comment"
        value={state.value}
        onChange={handleChange}
        ref={contentRef}
      ></ContentInput>
      {state.visible && <Count>{state.value.length} characters</Count>}
    </Container>
  );
};

export { DebouncedInput };
