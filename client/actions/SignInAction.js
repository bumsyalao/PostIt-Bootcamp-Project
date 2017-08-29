/* global localStorage */
import axios from 'axios';
import attachAuthorizationToken from '../utils/attachToken';
import { SIGN_IN_USER, SIGN_OUT_USER } from './types';


export const logout = () =>
  (dispatch) => {
    localStorage.removeItem('token');
    attachAuthorizationToken(false);
    return dispatch({ type: SIGN_OUT_USER });
  };

export const userSignInRequest = userData =>
    dispatch => axios.post('/api/user/signin', userData)
      .then((success) => {
        localStorage.setItem('token', success.data.token);
        return dispatch({
          userInfo: success.data.foundUser,
          type: SIGN_IN_USER,
          message: success.data.message
        });
      })
      .catch(() => {
        console.log('console');
      });
export const forgotPasswordAction = email =>
    dispatch => axios.post('/api/user/forgot-password', email)
      .then((response) => {
        console.log(response.data);
      })
    .catch((error) => { throw error; });

export const resetPasswordAction = password =>
      dispatch => axios.post('/api/user/update-password', password)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          throw error;
        });
