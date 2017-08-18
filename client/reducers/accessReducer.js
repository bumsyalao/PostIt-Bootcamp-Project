import * as types from '../actions/types';

export default (state = { user: {} }, action) => {
  switch (action.type) {
    case types.SIGN_UP_USER:
    case types.SIGN_IN_USER:
    case types.SIGN_OUT_USER:
    case 'LOGGEDIN_USER':
      return {
        ...state,
        user: action.userInfo
      };
    default: return state;
  }
};
