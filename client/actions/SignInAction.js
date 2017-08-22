/* global localStorage */
import axios from 'axios';
import attachAuthorizationToken from '../utils/attachToken';
import { SIGN_IN_USER, SIGN_OUT_USER } from './types';
import { setCurrentUser } from './users';


export const logout = () =>
  (dispatch) => {
    localStorage.removeItem('token');
    attachAuthorizationToken(false);
    dispatch(setCurrentUser({}, SIGN_OUT_USER));
  };

export const userSignInRequest = userData =>
    dispatch => axios.post('/api/user/signin', userData)
      .then((success) => {
        localStorage.setItem('token', success.data.token);
        attachAuthorizationToken(success.data.token);
        return dispatch(setCurrentUser(success.data.foundUser, SIGN_IN_USER));
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
