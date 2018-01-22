/* global localStorage */
import axios from 'axios';
import attachAuthorizationToken from '../utils/attachAuthorizationToken';
import { SIGN_IN_USER, SIGN_OUT_USER } from './types';

export const userSignoutSuccess = () => ({
  type: SIGN_OUT_USER
});

/**
 * api call to logout
 * @param {object} null
 * @return {boolean} returns if the call is successful
 */
export const logout = () =>
  (dispatch) => {
    localStorage.removeItem('token');
    attachAuthorizationToken(false);
    return dispatch(userSignoutSuccess());
  };


export const userSigninSuccess = (userDetails, message) => ({
  userInfo: userDetails,
  type: SIGN_IN_USER,
  message });
/**
 * api call to userSignInRequest
 * @param {object} userData
 * @return {object} returns userDetails userDetails
 */
export const userSignInRequest = userData =>
  dispatch => axios.post('/api/v1/user/signin', userData)
    .then((response) => {
      localStorage.setItem('token', response.data.token);
      attachAuthorizationToken(response.data.token);
      return dispatch(userSigninSuccess(
        response.data.userDetails, response.data.message));
    })
    .catch((error) => {
      throw error;
    });

/**
 * api call to forgotPasswordAction
 * @param {object} email
 * @return {any}
 */
export const forgotPasswordAction = email =>
dispatch => axios.post('/api/v1/user/forgot-password', email);

/**
 * api call to resetPasswordAction
 * @param {object} data
 * @return {any}
 */
export const resetPasswordAction = email =>
dispatch => axios.put(`/api/v1/user/update-password/${email.hash}`, email);
