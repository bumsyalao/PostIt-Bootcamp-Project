import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import * as actionType from '../../actions/types';
import userSignupRequest from '../../actions/signupAction';
import localStorageMock from '../../__mocks__/localStorageMock';

window.localStorage = localStorageMock;
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const token =
  'token';

describe('Signup Action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('Signup User', () => {
    it('should make AJAX call to sign up user', (done) => {
      moxios.stubRequest('/api/v1/user/signup', {
        status: 200,
        response: {
          token,
          userInfo: {
            userId: 1,
            username: 'banku',
            email: 'banku@gmail.com',
            phonenumber: '09082091930'
          },
          message: 'Your account has been created'
        }
      });
      const store = mockStore({});
      const expectedAction = [{
        userInfo: {
          userId: 1,
          username: 'banku',
          email: 'banku@gmail.com',
          phonenumber: '09082091930'
        },
        type: actionType.SIGN_UP_USER,
        message: null
      }];
      store.dispatch(userSignupRequest({
        username: 'banku',
        email: 'banku@gmail.com',
        phonenumber: '09082091930',
        password: 'banku',
        confirmPassword: 'banku'
      })).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
  });
});
