import * as types from '../actions/types';

export default (state = { group: {}, groupList: {}, groupMessages: [] }, action = {}) => {
  switch (action.type) {
    case types.ADD_MEMBER_TO_GROUP:
      return {
        ...state,
        group: action.userInfo
      };
    case types.LIST_GROUPS:
      return {
        ...state,
        groupList: action.userInfo
      };
    case types.LIST_GROUP_MESSAGES:
      return {
        ...state,
        groupMessages: action.userInfo
      };
    default: return state;
  }
};
