import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  BrowserRouter
} from 'react-router-dom';

import LoginContainer from './LoginContainer';

const App = () => {
  return (
    <div>
      <Route path="/" component={LoginContainer} />
    </div>
  );
};

export default App;

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
