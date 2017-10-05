import * as types from '../actions/types';

const initialState = {
  users: [],
  usergroups: [],
  pagination: {}
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case types.LIST_ALL_USERS:
      return {
        ...state,
        users: action.users,
        pagination: action.metaData
      };
    case types.ALL_USERS_GROUPS:
      return {
        ...state,
        usergroups: action.groups
      };
    default: return state;
  }
};
