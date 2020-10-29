import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { LoginContainer, GitHubCallback } from './auth';
const IssueContainer = null; // import IssueContainer from './issue';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <Switch>
      <Route path="/" exact component={token === undefined ? IssueContainer : LoginContainer} />
      <Route path="/users/github/callback" cb={setToken} component={GitHubCallback} />
    </Switch>
  );
};

export default App;

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
