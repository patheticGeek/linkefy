import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './assets/index.css';
import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { connect } from 'react-redux';
import { login, logout } from './actions';
import { loadState, saveState } from './localStorage';
import firebase from './firebase';
import Home from './components/Home';
import Signin from './components/Signin';
import Admin from './components/Admin';
import AddLinks from './components/AddLinks';
import UserProfile from './components/UserProfile';
import Settings from './components/Settings';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedState = loadState();
const store = createStore(rootReducer, persistedState, composeEnhancer(applyMiddleware(thunk)));

store.subscribe(() => {
  var state = store.getState();
  saveState({ ...state, success: false, error: false, message: '' });
});

class Router extends React.Component {
  componentWillMount() {
    const that = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        var name = user.displayName;
        var email = user.email;
        var avatar = user.photoURL;
        var emailVerified = user.emailVerified;
        var uid = user.uid;
        let userData = { name, email, avatar, uid, emailVerified };
        that.props.login(userData);
      } else {
        that.props.logout();
      }
    });
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signin" component={Signin} />
          <Route
            exact
            path="/admin"
            render={() => (
              <Admin page="links">
                <AddLinks />
              </Admin>
            )}
          />
          <Route
            exact
            path="/admin/analytics"
            render={() => (
              <Admin page="analytics">
                <AddLinks />
              </Admin>
            )}
          />
          <Route
            exact
            path="/admin/settings"
            render={() => (
              <Admin page="settings">
                <Settings />
              </Admin>
            )}
          />
          <Route exact path="/:username" component={UserProfile} />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: user => dispatch(login(user)),
    logout: () => dispatch(logout())
  };
};

const ConnectedRouter = connect(
  ({ logedin, user }) => ({
    logedin,
    user
  }),
  mapDispatchToProps
)(Router);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter />
  </Provider>,
  document.getElementById('root')
);
