/* global expect test */
import groupReducer from '../../reducers/groupsReducer';
import {
  loadGroups, loadGroup, loadUsers } from '../../actions/groups';

const initialState = {
  group: {},
  groupList: [],
};

const userGroups = [
  {
    groupId: 1,
    groupName: 'Bunmi'
  },
  {
    groupId: 2,
    groupName: 'Test'
  }
];
const group = {
  id: 1,
  groupName: 'Bunmi',
  createdAt: '2017-11-24T00:29:12.632Z',
  updatedAt: '2017-11-24T00:29:12.632Z'
};
const users = [
  {
    groupId: 1,
    userId: 1,
    username: 'bunmi',
    groupName: 'Bunmi',
    createdAt: '2017-11-24T00:29:12.636Z',
    updatedAt: '2017-11-24T00:29:12.636Z'
  }
];
describe('Group Reducer', () => {
  it('should load all groups when loadGroup is called', () => {
    const action = loadGroups(userGroups);
    const newState = groupReducer(initialState, action);

    expect(newState.groupList.length).toEqual(2);
    expect(newState.groupList[0]).toEqual({ groupId: 1, groupName: 'Bunmi' });
  });

  it('should load a group when loadGroup is called', () => {
    const action = loadGroup(group);
    const newState = groupReducer(initialState, action);

    expect(newState[action.group.id]).toEqual(group);
  });

  it('should load users in a group when loadUsers is called', () => {
    const action = loadUsers(users, 1);
    const loadGroupState = groupReducer(initialState, loadGroups(userGroups));
    const newState = groupReducer(loadGroupState, action);
    expect(newState.groupList[0].users).toEqual(users);
  });

  it('should return default state when no action is called', () => {
    const newState = groupReducer(initialState);
    expect(newState.group).toEqual({});
    expect(newState.groupList).toEqual([]);
  });
});
