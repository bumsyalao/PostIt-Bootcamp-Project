import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import * as actionType from '../../actions/types';
import {
  userSignInRequest, logout, forgotPasswordAction
} from '../../actions/SignInAction';
import localStorageMock from '../../__mocks__/localStorageMock';

window.localStorage = localStorageMock;
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const token =
  'token';

describe('Signin Action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('Signin User', () => {
    it('should make AJAX call to sign in user', (done) => {
      moxios.stubRequest('/api/v1/user/signin', {
        status: 200,
        response: {
          token,
          userDetails: {
            userId: 1,
            username: 'banku',
            email: 'banku@gmail.com',
            phonenumber: '09082091930'
          },
          message: 'You have logged in succesfully'
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
        type: actionType.SIGN_IN_USER,
        message: 'You have logged in succesfully'
      }];
      store.dispatch(userSignInRequest({
        username: 'banku',
        password: 'banku'
      })).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
    it('should sign out user', (done) => {
      moxios.stubRequest('/api/v1/user/signout', {
        status: 200,
        response: {
          message: null
        }
      });
      const store = mockStore({});
      const expectedAction = [{
        type: actionType.SIGN_OUT_USER,
      }];
      // console.log(typeOf(store.dispatch(logout())));
      // store.dispatch(logout).then(() => {
      //   expect(store.getActions()).toEqual(expectedAction);
      // });
      store.dispatch(logout());
      expect(store.getActions()).toEqual(expectedAction);
      done();
    });

    it('should make AJAX call when to recover a user password', (done) => {
      moxios.stubRequest('/api/v1/user/forgot-password', {
        status: 200,
        response: {
          data: {
            message: {
              accepted: [
                'banku@gmail.com'
              ],
              rejected: [],
              response: '250 2.0.0 OK 1509726135 y40sm6002343ede.0 - gsmtp',
              envelope: {
                from: 'alaobunmi93@gmail.com',
                to: [
                  'banku@gmail.com'
                ]
              },
              messageId: '<7c9757d0-de98-915f-52ef-821492ad5bc8@gmail.com>'
            }
          },
          updatedUser: {
            id: 1,
            username: 'banku',
            email: 'banku@gmail.com',
            phonenumber: '09082091930',
            forgotpasswordtoken: null,
            expirytime: '2017-11-03T17:22:13.591Z',
            hash: '$2a$08$zQaF5tbBStLOLzXOpyAe9Ozv3ohkInV5bBC4wpUEFcEYlhvDHw6oy',
            createdAt: '2017-10-02T08:20:29.196Z'
          }
        }
      });
      const store = mockStore({});
      const expectedAction = [{
        type: actionType.RECOVER_PASSWORD,
        message: 'password reset link sent'
      }];
      store.dispatch(forgotPasswordAction({
        email: 'banku@gmail.com'
      })).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });

    it('should make AJAX call to update password', (done) => {
      const data = '';
      moxios.stubRequest(`/api/v1/user/update-password/${data.hash}`, {
        status: 200,
        response: {
          data: {
            message: {
              accepted: [
                'banku@gmail.com'
              ],
              rejected: [],
              response: '250 2.0.0 OK 1509726135 y40sm6002343ede.0 - gsmtp',
              envelope: {
                from: 'alaobunmi93@gmail.com',
                to: [
                  'banku@gmail.com'
                ]
              },
              messageId: '<7c9757d0-de98-915f-52ef-821492ad5bc8@gmail.com>'
            }
          },
          updatedUser: {
            id: 1,
            username: 'banku',
            email: 'banku@gmail.com',
            phonenumber: '09082091930',
            forgotpasswordtoken: null,
            expirytime: '2017-11-03T17:22:13.591Z',
            hash: '$2a$08$zQaF5tbBStLOLzXOpyAe9Ozv3ohkInV5bBC4wpUEFcEYlhvDHw6oy',
            createdAt: '2017-10-02T08:20:29.196Z'
          }
        }
      });
      const store = mockStore({});
      const expectedAction = [{
        type: actionType.RECOVER_PASSWORD,
        message: 'password reset link sent'
      }];
      store.dispatch(forgotPasswordAction({
        email: 'banku@gmail.com'
      })).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
  });
});
