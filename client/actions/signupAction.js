/* global localStorage */
/* global Materialize */
import axios from 'axios';
import attachAuthorizationToken from '../utils/attachToken';
import { SET_CURRENT_USER } from './types';

export const setCurrentUser = userInfo => ({
  type: SET_CURRENT_USER,
  userInfo
});

export const userSignupRequest = userData =>
  dispatch => axios.post('/api/user/signup', userData)
    .then((success) => {
      localStorage.setItem('token', success.data.token);
      dispatch(setCurrentUser(success.data.existingUser));
      attachAuthorizationToken(
        success.data.token
        );
      Materialize.toast('Your account has been created', 5000, 'green');
    })
    .catch((error) => {
      throw error.response.data.message;
    });
