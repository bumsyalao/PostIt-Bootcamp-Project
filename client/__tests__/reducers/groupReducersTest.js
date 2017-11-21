/* global expect test */
import group from '../../reducers/groupsReducer';
import {
  addUser, loadGroups, loadGroup, loadUsers } from '../../actions/groups';

const initialState = {
  group: {},
  groupList: [],
  groupMessages: [],
};
const groups = [
  { id: 1, groupname: 'Trap' },
  { id: 2, groupname: 'Hiphop' }
];

const agroup = {
  id: 1,
  groupname: 'Trap',
  createdAt: '2017-10-02T08:20:40.859Z',
  updatedAt: '2017-10-02T08:20:40.859Z'
};

const busers = [
  {
    groupId: 59,
    userId: 119,
    username: 'test',
    groupName: 'Group',
    createdAt: '2017-11-14T20:52:55.426Z',
    updatedAt: '2017-11-14T20:52:55.426Z'
  },
  {
    groupId: 59,
    userId: 1,
    username: 'bantu',
    groupName: 'Group',
    createdAt: '2017-11-14T20:54:04.929Z',
    updatedAt: '2017-11-14T20:54:04.929Z'
  }
];
describe('Group Reducer', () => {
  it('should load all groups when loadGroup is called', () => {
    const action = loadGroups(groups);
    const newState = group(initialState, action);

    expect(newState.groupList.length).toEqual(2);
    expect(newState.groupList[0]).toEqual({ id: 1, groupname: 'Trap' });
  });

  it('should load a group when loadGroup is called', () => {
    const action = loadGroup(agroup);
    const newState = group(initialState, action);

    expect(newState[action.group.id]).toEqual(agroup);
  });

  it('should load users in a group when loadUsers is called', () => {
    const action = loadUsers(busers, 59);
    const loadGroupState = group(initialState, loadGroups(groups));
    const newState = group(loadGroupState, action);

    expect(newState.groupList[0].users).toEqual(busers);
  });
});
