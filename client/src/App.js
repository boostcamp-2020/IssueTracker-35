import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import { LoginContainer, GitHubCallback } from './auth';
const IssueContainer = null; // import IssueContainer from './issue';

const GlobalStyle = createGlobalStyle`
  body {
    position: relative;
    margin: 0;
    height: 100vh;
    background-color: #F6F6F6;
  }
`;

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <>
      <GlobalStyle />
      <Switch>
        <Route path="/" exact component={!token ? LoginContainer : IssueContainer} />
        <Route path="/users/github/callback" render={props => <GitHubCallback {...props} cb={setToken} />} />
      </Switch>
    </>
  );
};

export default App;

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
