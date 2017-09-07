import * as types from '../actions/types';

const initialState = {
  group: {},
  groupList: [],
  groupMessages: [],
  users: []
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case types.ADD_MEMBER_TO_GROUP:
      return {
        ...state,
        group: action.groups
      };
    case types.LIST_GROUPS:
      return {
        ...state,
        groupList: action.groups
      };
    case types.LIST_ALL_USERS:
      return {
        ...state,
        users: action.users
      };
    case types.LIST_GROUP_MESSAGES:
      return {
        ...state,
        groupMessages: action.groups
      };
    default: return state;

    case types.LOAD_MESSAGE:
      return {
        ...state,
      };

    case types.GET_GROUP_USERS:
      const groupList = state.groupList;
      const group = groupList.filter(grp => grp.id === action.groupId)[0];
      group.users = action.users;
      // remove the exustubg
      const allGroups = groupList.filter(group => group.id !== action.groupId);

      return {
        ...state,
        groupList: [...allGroups, group]
      };
  }
};
