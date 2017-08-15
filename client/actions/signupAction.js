import axios from 'axios';

const userSignupRequest = (userData) => {
  return (dispatch) => {
    return axios.post('/api/user/signup', userData)
    .then((response) => {
      Materialize.toast('Your account has been created', 10000, 'red');
    })
    .catch((err) => {
      Materialize.toast(err.response.data.message, 10000, 'red');

    });
  };
};

export { userSignupRequest };
