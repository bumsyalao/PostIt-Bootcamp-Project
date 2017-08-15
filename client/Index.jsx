import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers/rootReducer';
import attachAuthorizationToken from "../client/utils/attachToken";
import store from '../client/store/configureStore';
import { setCurrentUser } from './actions/SignInAction';
// import './css/style.css'

import Routes from './Routes';
import { ConnectedRouter } from 'react-router-redux';

if (localStorage.token) {
  attachAuthorizationToken(
  localStorage.token
  );
}

render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
</Provider>, document.getElementById("app"));