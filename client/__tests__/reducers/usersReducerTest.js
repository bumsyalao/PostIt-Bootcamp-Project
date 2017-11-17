/* global expect jest test */
import users from '../../reducers/usersReducer';
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

const allUsers = [
  {
    username: 'banku',
    email: 'banku@gmail.com'
  },
  {
    username: 'testuser',
    email: 'test@email.com'
  },
  {
    username: 'bumsy',
    email: 'alaobunmi93@gmail.com'
  },
  {
    username: 'sage',
    email: 'sage@gmail.com'
  },
  {
    username: 'bantu',
    email: 'bantu@email.com'
  }
];

const pagination = {
  page: 1,
  pageCount: 5,
  pageSize: 5,
  count: 22
};

describe('Users Reducer', () => {
  it('should load all users when loadAllUsers is called', () => {
    const action = loadAllUsers(allUsers, pagination);
    const newState = users(initialState, action);

    console.log(newState);
  });

  it('should get a user\'s group when get getUserGroups is called', () => {
    const action = getUserGroups(userGroups);
    const newState = users(initialState, action);

    expect(newState.usergroups[0]).toEqual({ groupname: 'banku' });
  });

  it('should return default state when no action is called', () => {
    const newState = users(initialState);

    expect(newState.usergroups).toEqual([]);
  });
});
