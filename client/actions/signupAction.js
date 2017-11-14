import axios from 'axios';
import attachAuthorizationToken from '../utils/attachAuthorizationToken';
import { SIGN_UP_USER } from './types';

export const setCurrentUser = (userInfo, type) => ({
  type,
  userInfo
});

/**
 * api call to userSignupRequest
 * @param {object} userData
 * @return {object} returns userInfo
 */
export const userSignupRequest = userData =>
  dispatch => axios.post('/api/v1/user/signup', userData)
    .then((response) => {
      localStorage.setItem('token', response.data.token);
      dispatch(setCurrentUser(response.data.userInfo, SIGN_UP_USER));
      attachAuthorizationToken(
        response.data.token
      );
      Materialize.toast(response.data.message, 5000, 'green');
    })
    .catch((error) => {
      throw error;
    });
