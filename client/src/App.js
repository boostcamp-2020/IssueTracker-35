import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Header from '@/components/Header';
import size from '@/styles/sizes';

import { UserContext } from '@/store/user';

import LoginContainer from '@/containers/login';
import GitHubCallback from '@/components/login/github';
import IssueListContainer from '@/containers/issue/list';
import IssueWriteContainer from '@/containers/issue/write';

import GlobalStore from '@/store';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Yeon+Sung&display=swap');  
  body {
    position: relative;
    margin: ${size.HEADER_SIZE} 0 0 0;
    height: 100vh;
    background-color: #F6F6F6;
    font-family: 'Yeon Sung';
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
          component={isLoggedIn ? LoginContainer : IssueListContainer}
        />
        <Route path="/issues/new" exact component={IssueWriteContainer} />
        <Route path="/issues" exact component={IssueListContainer} />
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
      <Header />
      <App />
    </AppProvider>
  </Router>,
  document.getElementById('root')
);
