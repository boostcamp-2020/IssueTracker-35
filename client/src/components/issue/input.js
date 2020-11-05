import React, { useReducer } from 'react';

const DELAY = 2000;

// action types
const INPUT_CONTENT = 'INPUT_CONTENT'; /* user input change */
const SHOW_COUNT =
  'SHOW_COUNT'; /* DELAY miliseconds have passed since last input */
const CLEAR_COUNT =
  'CLEAR_COUNT'; /* DELAY miliseconds have passed since showing count */

const initState = {
  timerId: 0,
  value: '',
  visible: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case INPUT_CONTENT:
      return {
        timerId: action.timerId,
        value: action.value,
        visible: false,
      };
    case SHOW_COUNT:
      return {
        timerId: action.timerId,
        value: state.value,
        visible: true,
      };
    case CLEAR_COUNT:
      return {
        timerId: 0,
        value: state.value,
        visible: false,
      };
    default:
      throw new Error();
  }
};

const DebouncedInput = () => {
  const [state, dispatch] = useReducer(reducer, initState);

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
    <div>
      <input
        type="textarea"
        value={state.value}
        onChange={handleChange}
      ></input>
      {state.visible && <p>{state.value.length} characters</p>}
    </div>
  );
};

export { DebouncedInput };
