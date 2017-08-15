import axios from 'axios';

const attachAuthorizationToken = (token) => {
  const injector = axios.create();
  const defaultHeaders = injector.defaults.headers.common || {};

  if (token) {
    defaultHeaders['x-access-token'] = token;
  } else {
    delete defaultHeaders['x-access-token'];
  }
};

export default attachAuthorizationToken;
