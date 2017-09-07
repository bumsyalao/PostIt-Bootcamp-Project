/* global localStorage */
/* global Materialize */
import axios from 'axios';
import attachAuthorizationToken from '../utils/attachToken';
import { SIGN_UP_USER } from './types';
import setCurrentUser from './users';


const userSignupRequest = userData =>
  dispatch => axios.post('/api/user/signup', userData)
    .then((response) => {
      localStorage.setItem('token', response.data.token);
      dispatch(setCurrentUser(response.data.existingUser, SIGN_UP_USER));
      attachAuthorizationToken(
        response.data.token
      );
      Materialize.toast('Your account has been created', 5000, 'green');
    })
    .catch((error) => {
      throw error.response.data.message;
    });

export default userSignupRequest;
