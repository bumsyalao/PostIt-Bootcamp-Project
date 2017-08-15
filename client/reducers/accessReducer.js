import * as types from '../actions/types';

export default (state = { user: {} }, action = {}) => {
  switch (action.type) {
    case types.SET_CURRENT_USER:
      return [
        ...state,
        {
          user: action.userInfo
        }
      ];
    default: return state;
  }
};
