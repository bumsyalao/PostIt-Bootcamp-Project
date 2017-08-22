import * as types from '../actions/types';

export default (state = {}, action = {}) => {
  switch (action.type) {
    case types.LOAD_MESSAGE: {
      const oldMessages = state[action.groupId] || [];
      const userMessage = { ...action.message, username: action.username };
      const newMessages = [...oldMessages, userMessage];
      return {
        ...state,
        [action.groupId]: newMessages
      };
    }
    case types.GET_ALL_MESSAGES:
      return {
        ...state,
        [action.groupId]: action.messages
      };
    default:
      return {
        ...state
      };
  }
};