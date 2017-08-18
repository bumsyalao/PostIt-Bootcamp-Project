import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt from 'jsonwebtoken';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import attachAuthorizationToken from "../client/utils/attachToken";
import store from '../client/store/configureStore';
import { setCurrentUser } from './actions/SignInAction';
import './scss/style.scss'
import Routes from './Routes';

const token = localStorage.getItem('token')
if (token) {
  attachAuthorizationToken(token);
  const decoded = jwt.decode(token);
  console.log(decoded)
  const userInfo = {
    userId: decoded.userId,
    username: decoded.username,
    email: decoded.email
  };
  store.dispatch(
    { type: 'LOGGEDIN_USER', userInfo }
  );
}

render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
</Provider>, document.getElementById("app"));