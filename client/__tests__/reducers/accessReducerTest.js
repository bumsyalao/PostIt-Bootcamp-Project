/* global expect jest test */
import access from '../../reducers/accessReducer';
import { userSigninSuccess, userSignoutSuccess } from '../../actions/signInAction';

const state = {};
const newUser = {
  id: 21,
  username: 'banku',
  email: 'bunku@gmail.com',
  phonenumber: '09082091930',
  password: '$2a$10$zzPmWsXS/.CgFRpqFnKchO…K3IjcyXe2',
  forgotpasswordtoken: null,
  expirytime: null,
  hash: null,
  createdAt: '2017-09-19T10:22:27.188Z',
  updatedAt: '2017-09-19T10:22:27.188Z' };
const message = 'You have logged in succesfully';

describe('Sign in reducer', () => {
  it('should sign in a user when authentictaion is succesful', () => {
    const action = userSigninSuccess(newUser, message);

    const newState = access(state, action);

    expect(newState.user).toEqual(newUser);
    expect(newState.message).toEqual(message);
    expect(newState.user.id).toEqual(21);
  });

  it('should signout user when the signout action is called', () => {
    const action = userSignoutSuccess();
    const newState = access(state, action);

    expect(newState.user).toEqual({});
    expect(newState.message).toEqual(null);
    expect(newState.isAuthenticated).toEqual(false);
  });
});
