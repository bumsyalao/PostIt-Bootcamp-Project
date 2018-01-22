import * as types from '../actions/types';

export default (
  state = { user: {}, message: null, isAuthenticated: false },
  action
) => {
  switch (action.type) {
    case types.SIGN_UP_USER:
    case types.SIGN_IN_USER:
    case types.LOGGEDIN_USER:
      return {
        ...state,
        user: action.userInfo,
        message: action.message,
        isAuthenticated: true
      };
    case types.SIGN_OUT_USER:
      return { ...state, user: {}, message: null, isAuthenticated: false };
    default:
      return state;
  }
};
