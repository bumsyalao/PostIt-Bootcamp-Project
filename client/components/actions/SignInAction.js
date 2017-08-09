import axios from 'axios';
import attachAuthorizationToken from '../utils/attachToken';
import { SET_CURRENT_USER } from './types';

export const setCurrentUser = userInfo => ({
  type: SET_CURRENT_USER,
  userInfo
});

export const userSignInRequest = userData =>
  dispatch => axios.post('/users/login', userData)
    .then((success) => {
      localStorage.setItem('token', success.data.token);
      dispatch(setCurrentUser(success.data.existingUser));
      attachAuthorizationToken(
        success.data.token
        );
    })
    .catch((error) => {
      throw error.response.data.message;
    });
