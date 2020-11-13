import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '@/store/user';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { state, dispatch } = useContext(UserContext);
  const isLoggedIn = state.token;
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  );
};

const GuestRoute = ({ component: Component, ...rest }) => {
  const { state, dispatch } = useContext(UserContext);
  const isLoggedIn = state.token;
  return (
    <Route
      {...rest}
      render={props =>
        !isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/issues',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};
export { PrivateRoute, GuestRoute };
