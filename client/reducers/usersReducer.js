import * as types from '../actions/types';

const initialState = {
  users: []
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case types.LIST_ALL_USERS:
      return {
        users: action.users
      };
    default: return state;
  }
};
