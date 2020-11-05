import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import { UserContext } from '@/store/user';

import LoginContainer from '@/containers/login';
import GitHubCallback from '@/components/login/github';
const IssueContainer = null; // import IssueContainer from './issue';

import GlobalStore from '@/store';

const GlobalStyle = createGlobalStyle`
  body {
    position: relative;
    margin: 0;
    height: 100vh;
    background-color: #F6F6F6;
  }
`;

const AppProvider = ({ contexts, children }) =>
  contexts.reduce(
    (prev, context) => React.createElement(context, [], prev),
    children
  );

const App = () => {
  const { state, dispatch } = useContext(UserContext);
  const isLoggedIn = !state?.token;
  return (
    <>
      <GlobalStyle />
      <Switch>
        <Route
          path="/"
          exact
          component={isLoggedIn ? LoginContainer : IssueContainer}
        />
        <Route path="/issues" exact component={IssueContainer} />
        <Route
          path="/users/github/callback"
          render={props => <GitHubCallback {...props} dispatch={dispatch} />}
        />
      </Switch>
    </>
  );
};

export default App;

ReactDOM.render(
  <Router>
    <AppProvider contexts={GlobalStore}>
      <App />
    </AppProvider>
  </Router>,
  document.getElementById('root')
);
