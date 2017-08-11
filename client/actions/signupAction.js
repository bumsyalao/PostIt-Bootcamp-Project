import axios from 'axios';

const userSignupRequest = (userData) => {
  return (dispatch) => axios.post('/api/user/signup', userData);
}

export default userSignupRequest;
