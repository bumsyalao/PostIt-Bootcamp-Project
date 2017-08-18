/* global localStorage */
/* global Materialize */
import axios from 'axios';
import attachAuthorizationToken from '../utils/attachToken';
import { SIGN_UP_USER, setCurrentUser } from './types';


const userSignupRequest = userData =>
  dispatch => axios.post('/api/user/signup', userData)
    .then((success) => {
      localStorage.setItem('token', success.data.token);
      dispatch(setCurrentUser(success.data.existingUser, SIGN_UP_USER));
      attachAuthorizationToken(
        success.data.token
        );
      Materialize.toast('Your account has been created', 5000, 'green');
    })
    .catch((error) => {
      throw error.response.data.message;
    });

export default userSignupRequest;
