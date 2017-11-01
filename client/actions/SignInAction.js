/* global localStorage */
import axios from 'axios';
import attachAuthorizationToken from '../utils/attachToken';
import { SIGN_IN_USER, SIGN_OUT_USER } from './types';

export const userSignoutSuccess = () => ({
  type: SIGN_OUT_USER
});

export const logout = () =>
  (dispatch) => {
    localStorage.removeItem('token');
    attachAuthorizationToken(false);
    return dispatch(userSignoutSuccess());
  };

export const userSigninSuccess = (foundUser, message) => ({
  userInfo: foundUser,
  type: SIGN_IN_USER,
  message });

export const userSignInRequest = userData =>
  dispatch => axios.post('/api/v1/user/signin', userData)
    .then((response) => {
      localStorage.setItem('token', response.data.token);
      attachAuthorizationToken(response.data.token);
      return dispatch(userSigninSuccess(response.data.foundUser, response.data.message));
    })
    .catch((error) => {
      throw error;
    });

export const forgotPasswordAction = email =>
  dispatch => axios.post('/api/v1/user/forgot-password', email);
    // .then((response) => {
    //   console.log(response.data);
    // })
    // .catch((error) => {
    //   throw error;
    // });

export const resetPasswordAction = data =>
  dispatch => axios.put(`/api/v1/user/update-password/${data.hash}`, data);
      // .then((response) => {
      //   console.log(response.data);
      // });
