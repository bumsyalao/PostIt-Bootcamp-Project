/* global expect test */
import access from '../../reducers/accessReducer';
import { userSigninSuccess,
  userSignoutSuccess } from '../../actions/signInAction';
import { setCurrentUser } from '../../actions/signupAction';

const state = {};
const message = 'You have logged in succesfully';
const user = {
  userId: 3,
  username: 'michelle',
  email: 'michelle@email.com',
  phoneNumber: '07045454545'
};

describe('Sign in reducer', () => {
  it('should sign in a user when authentictaion is succesful', () => {
    const action = userSigninSuccess(user, message);
    const newState = access(state, action);
    expect(newState.user.username).toEqual('michelle');
    expect(newState.message).toEqual('You have logged in succesfully');
    expect(newState.user.userId).toEqual(3);
    expect(newState.isAuthenticated).toEqual(true);
  });

  it('should sign in a user when authentictaion is succesful', () => {
    const action = setCurrentUser(user);
    const newState = access(state, action);
    expect(newState.user.username).toEqual('michelle');
    expect(newState.user.userId).toEqual(3);
    expect(newState.isAuthenticated).toEqual(true);
  });

  it('should signout user when the signout action is called', () => {
    const action = userSignoutSuccess();
    const newState = access(state, action);

    expect(newState.user).toEqual({});
    expect(newState.message).toEqual(null);
    expect(newState.isAuthenticated).toEqual(false);
  });
});
