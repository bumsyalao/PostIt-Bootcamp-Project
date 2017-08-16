import * as types from '../actions/types';

export default (state = { group: {} }, action = {}) => {
  switch (action.type) {
    case types.ADD_MEMBER_TO_GROUP:
      return [
        ...state,
        {
          group: action.userInfo
        }
      ];
    default: return state;
  }
};
