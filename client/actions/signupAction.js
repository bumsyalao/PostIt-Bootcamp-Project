import axios from 'axios';

const userSignupRequest = (userData) => {
  return (dispatch) => {
    return axios.post('/api/user/signup', userData).then((response) => {
      console.log(response.data);
    });
  };
};

export { userSignupRequest };
