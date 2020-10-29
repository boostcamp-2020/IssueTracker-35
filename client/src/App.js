import React from 'react';
import ReactDOM from 'react-dom';
import LoginContainer from './LoginContainer';

const App = () => {
  return (
    <div>
      <p>React here!</p>
      <LoginContainer></LoginContainer>
    </div>
  );
};

export default App;

ReactDOM.render(<App />, document.querySelector('#root'));
