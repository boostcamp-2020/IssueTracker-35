import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { createGlobalStyle } from 'styled-components';
import size from '@/styles/sizes';
import color from '@/styles/colors';

import GlobalStore from '@/store';
import { UserContext } from '@/store/user';

import Header from '@/components/header';
import LoginContainer from '@/containers/login';
import GitHubCallback from '@/components/login/github';
import IssueListContainer from '@/containers/issue/list';
import IssueWriteContainer from '@/containers/issue/write';
import IssueDetailContainer from '@/containers/issue/detail';
import LabelListContainer from '@/containers/label/list';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Yeon+Sung&display=swap');  
  body {
    position: relative;
    margin: ${size.HEADER_SIZE} 0 0 0;
    height: calc(100vh - ${size.HEADER_SIZE});
    background-color: ${color.WHITE};
    font-family: 'Yeon Sung';
  }
  * {
    box-sizing: border-box;
  }
`;

const AppProvider = ({ contexts, children }) =>
  contexts.reduce(
    (prev, context) => React.createElement(context, [], prev),
    children
  );

const App = () => {
  const { state, dispatch } = useContext(UserContext);

  const isLoggedIn = !state.token;
  return (
    <>
      <GlobalStyle />
      <Switch>
        <Route
          path="/"
          exact
          component={isLoggedIn ? LoginContainer : IssueListContainer}
        />
        <Route exact path="/issues/new" component={IssueWriteContainer} />
        <Route exact path="/issues/:issueId" component={IssueDetailContainer} />
        <Route exact path="/issues" component={IssueListContainer} />
        <Route exact path="/labels" component={LabelListContainer} />
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
