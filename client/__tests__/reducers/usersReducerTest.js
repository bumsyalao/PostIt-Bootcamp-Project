/* global expect test */
import usersReducer from '../../reducers/usersReducer';
import { loadAllUsers, getUserGroups } from '../../actions/users';


const initialState = {
  users: [],
  usergroups: [],
  pagination: {}
};

const userGroups = [
  { groupname: 'banku' },
  { groupname: 'Trap' }
];

const users = [
  {
    id: 1,
    username: 'bunmi',
    email: 'alaobunmi93@gmail.com'
  },
  {
    id: 2,
    username: 'test',
    email: 'test@email.com'
  },
  {
    id: 3,
    username: 'michelle',
    email: 'michelle@email.com'
  },
  {
    id: 4,
    username: 'param',
    email: 'param@email.com'
  }
];

const metaData = {
  page: 1,
  pageCount: 1,
  pageSize: 4,
  count: 4
};

describe.only('Users Reducer', () => {
  it('should load all users when loadAllUsers is called', () => {
    const action = loadAllUsers({ users, metaData });
    const newState = usersReducer(initialState, action);
    
    expect(newState.users[0]).toEqual({
      id: 1, username: 'bunmi', email: 'alaobunmi93@gmail.com' });
    expect(newState.pagination.page).toEqual(1);
  });

  it('should get a user\'s group when get getUserGroups is called', () => {
    const action = getUserGroups(userGroups);
    const newState = usersReducer(initialState, action);

    expect(newState.usergroups[0]).toEqual({ groupname: 'banku' });
  });

  it('should return default state when no action is called', () => {
    const newState = usersReducer(initialState);

    expect(newState.usergroups).toEqual([]);
    expect(newState.users).toEqual([]);
    expect(newState.pagination).toEqual({});
  });
});
