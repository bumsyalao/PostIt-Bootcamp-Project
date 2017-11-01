/* global expect test */
import group from '../../reducers/groupsReducer';
import users from '../../reducers/usersReducer';
import { loadGroups, loadGroup, loadUsers } from '../../actions/groups';
import { addUser } from '../../actions/createGroupRequest';

const initialState = {
  group: {},
  groupList: [],
  groupMessages: [],
};
const userState = {
  users: [],
  usergroups: [],
  pagination: {}
};
const groups = [
  { id: 1, groupname: 'Trap' },
  { id: 2, groupname: 'Hiphop' }
];
const userGroups = [
  { groupname: 'banku' },
  { groupname: 'Trap' }
];
const banku = [
  { createdAt: '2017-10-02T08:21:15.374Z',
    groupId: 1,
    groupname: 'Trap',
    updatedAt: '2017-10-02T08:21:15.374Z',
    userId: 1,
    username: 'banku' }];
const agroup = {
  id: 1,
  groupname: 'Trap',
  createdAt: '2017-10-02T08:20:40.859Z',
  updatedAt: '2017-10-02T08:20:40.859Z'
};
const groupUsers =
  {
    groupname: 'Trap',
    id: 1,
    users: [
      { createdAt: '2017-10-02T08:21:15.374Z',
        groupId: 1,
        groupname: 'Trap',
        updatedAt: '2017-10-02T08:21:15.374Z',
        userId: 1,
        username: 'banku' }]
  };
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

    console.log(newState);
    console.log(newState.id);
    expect.toEqual(1);
  });

  it('should add member to group when addUser is called', () => {
    const action = addUser(groups);
    const newState = group(initialState, action);

    expect(newState.groupList[0]).toEqual({ id: 1, groupname: 'Trap' });
  });

  it('should load users in a group when loadUsers is called', () => {
    const action = loadUsers(banku, 1);
    const loadGroupState = group(initialState, loadGroups(groups));
    const newState = group(loadGroupState, action);

    expect(newState.groupList[1]).toEqual(groupUsers);
  });
});
