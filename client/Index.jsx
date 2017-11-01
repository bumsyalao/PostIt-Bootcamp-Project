import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt from 'jsonwebtoken';
import attachAuthorizationToken from '../client/utils/attachToken';
import store from '../client/store/configureStore';
import { LOGGEDIN_USER } from './actions/types';
import './scss/style.scss';
import Routes from './Routes';

const token = global.localStorage.getItem('token');
// if (token) {
//   attachAuthorizationToken(token);
//   const decoded = jwt.decode(token);
//   if (decoded) {
//     const userInfo = {
//       userId: decoded.userId,
//       username: decoded.username,
//       email: decoded.email,
//       phonenumber: decoded.phonenumber
//     };
//     store.dispatch(
//       { type: LOGGEDIN_USER, userInfo }
//     );
//   }
// }

render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
</Provider>, document.getElementById('app')); // eslint-disable-line
