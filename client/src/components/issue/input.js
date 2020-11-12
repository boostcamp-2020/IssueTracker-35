import React, { useEffect, useReducer } from 'react';
import styled from 'styled-components';
import color from '@/styles/colors';
import size from '@/styles/sizes';
import { Textarea } from '@/styles/styled';

import { initState, reducer } from '@/store/input';
import { INPUT_CONTENT, SHOW_COUNT, CLEAR_COUNT } from '@/store/input/actions';

const DELAY = 2000;

const Container = styled.div`
  position: relative;
`;

const ContentInput = styled(Textarea)`
  width: 100%;
  resize: vertical;
  height: 200px;
  margin-bottom: 10px;
  font-size: ${size.DEFAULT_FONT_SIZE};
  padding: 8px;
  background-color: ${color.THIN_GRAY};
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

const DebouncedInput = ({ contentRef, notify, clear }) => {
  const [state, dispatch] = useReducer(reducer, initState);

  const clearTimer = () => state.timerId && clearTimeout(state.timerId);

  useEffect(() => clearTimer, []);
  useEffect(() => {
    if (clear) {
      dispatch({ type: INPUT_CONTENT, timerId: clearTimer(), value: '' });
      notify('');
    }
    return () => dispatch(); // clean up
  }, [clear]);

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
    if (notify) notify(value);
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
