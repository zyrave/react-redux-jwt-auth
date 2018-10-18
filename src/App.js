import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwtDecode from 'jwt-decode';

import store from './redux/configureStore';
import { setCurrentUser, setAuthorizationToken } from './redux/modules/auth';

import NavigationBar from './containers/NavigationBar';
import PrivateRoute from './containers/PrivateRoute';
import Landing from './containers/Landing';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Welcome from './containers/Welcome';

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  // Prevent someone from manually setting a key of 'jwtToken' in localStorage
  try {
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
  } catch (err) {
    store.dispatch(setCurrentUser({}));
  }
}

const App = () => (
  <BrowserRouter>
    <Provider store={store}>
      <>
        <NavigationBar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <PrivateRoute path="/welcome" component={Welcome} />
          <Route render={() => <h3>404 Page Not Found</h3>} />
        </Switch>
      </>
    </Provider>
  </BrowserRouter>
);

export default App;
