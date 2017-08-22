import * as types from '../actions/types';

export default (state = {}, action = {}) => {
  switch (action.type) {
    case types.LOAD_MESSAGE: {
      const oldMessages = state[action.groupId];
      const newMessages = [...oldMessages, action.message];
      return {
        ...state,
        [action.groupId]: newMessages
      };
    }
    default:
      return {
        ...state
      };
  }
};
