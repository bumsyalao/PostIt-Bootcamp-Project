import * as types from '../actions/types';

const initialState = {
  group: {},
  groupList: [],
  groupMessages: [],

};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case types.LIST_GROUPS:
      return {
        ...state,
        groupList: action.groups
      };
    case types.LIST_GROUP:
      return {
        ...state,
        [action.group.id]: action.group
      };
    case types.LIST_GROUP_MESSAGES:
      return {
        ...state,
        groupMessages: action.groups
      };

    case types.LOAD_MESSAGE:
      return {
        ...state,
      };
    case types.GET_GROUP_USERS: {
      const groupList = state.groupList;
      const group = groupList.find(
        foundGroup => foundGroup.id === action.groupId);
      const allGroups = groupList.filter(
        allGroup => allGroup.id !== action.groupId);

      return {
        ...state,
        groupList: [{ ...group, users: action.users }, ...allGroups]
      };
    }
    default: return state;
  }
};
