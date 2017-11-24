import * as types from '../actions/types';

const initialState = {
  group: {},
  groupList: [],
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

    case types.LOAD_MESSAGE:
      return {
        ...state,
      };
    case types.GET_GROUP_USERS: {
      const groupList = state.groupList;
      const group = groupList.find(
        foundGroup => foundGroup.groupId === action.groupId);
      const allGroups = groupList.filter(
        allGroup => allGroup.groupId !== action.groupId);

      return {
        ...state,
        groupList: [{ ...group, users: action.users }, ...allGroups]
      };
    }
    default: return state;
  }
};
