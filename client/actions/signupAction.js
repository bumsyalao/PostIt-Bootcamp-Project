/* global localStorage */
/* global Materialize */
import axios from 'axios';
import attachAuthorizationToken from '../utils/attachToken';
import { SIGN_UP_USER } from './types';
import setCurrentUser from './authAction';


const userSignupRequest = userData =>
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

export default userSignupRequest;
