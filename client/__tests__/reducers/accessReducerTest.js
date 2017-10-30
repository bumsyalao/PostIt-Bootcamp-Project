import access from '../../reducers/accessReducer';
import * as types from '../../actions/types';

describe('Sign in reducer', () => {
  it('SIGN_IN_USER', () => {
    const state = {};
    const action = {
      type: types.SIGN_IN_USER,
      user: {
        id: 21,
        username: 'banku',
        email: 'bunku@gmail.com',
        phonenumber: '09082091930',
        password: '$2a$10$zzPmWsXS/.CgFRpqFnKchO…K3IjcyXe2',
        forgotpasswordtoken: null,
        expirytime: null,
        hash: null,
        createdAt: '2017-09-19T10:22:27.188Z',
        updatedAt: '2017-09-19T10:22:27.188Z' },
      message: 'You have logged in succesfully',
      isAuthenticated: true
    };
    const results = access(state, action);
    expect(results)
            .toEqual({
              isAuthenticated: true,
              message: 'You have logged in succesfully',
              user: undefined
            });
  });
})
;
