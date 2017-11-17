import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import * as actionType from '../../actions/types';
import { getAllUsers, listAllUsers, allUserGroups } from '../../actions/users';
import localStorageMock from '../../__mocks__/localStorageMock';

window.localStorage = localStorageMock;
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const limit = 5;
const offset = 0;
const searchParam = '';
const groupId = 3;
const userid = 25;

describe('Users Action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('User Action', () => {
    it('should make AJAX call to get all Users', (done) => {
      moxios.stubRequest(`/api/v1/users?limit=${limit}&offset=${offset}&searchParam=${searchParam}`, {
        status: 200,
        response: {
          message: 'Users found',
          users:
          [{
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
          },
          {
            username: 'princess',
            email: 'princess@email.com'
          }],
          metaData: {
            page: 1,
            pageCount: 5,
            pageSize: '5',
            count: 24
          }
        }
      });
      const store = mockStore({});
      const expectedAction = [{
        users: [
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
          },
          {
            username: 'princess',
            email: 'princess@email.com'
          }
        ],
        metaData: {
          page: 1,
          pageCount: 5,
          pageSize: '5',
          count: 24
        },
        type: actionType.LIST_ALL_USERS
      }];
      store.dispatch(getAllUsers()).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });

    it('should make AJAX call to list All Users', (done) => {
      moxios.stubRequest(`/api/v1/group/${groupId}/users`, {
        status: 200,
        response: {
          users: [
            {
              groupId: 3,
              userId: 1,
              username: 'banku',
              groupname: 'Test Group',
              createdAt: '2017-10-02T08:21:15.374Z',
              updatedAt: '2017-10-02T08:21:15.374Z'
            },
            {
              groupId: 3,
              userId: 2,
              username: 'testuser',
              groupname: 'Test Group',
              createdAt: '2017-10-02T08:22:53.699Z',
              updatedAt: '2017-10-02T08:22:53.699Z'
            }
          ]
        }
      });
      const store = mockStore({});
      const expectedAction = [{
        users: [
          {
            groupId: 3,
            userId: 1,
            username: 'banku',
            groupname: 'Test Group',
            createdAt: '2017-10-02T08:21:15.374Z',
            updatedAt: '2017-10-02T08:21:15.374Z'
          },
          {
            groupId: 3,
            userId: 2,
            username: 'testuser',
            groupname: 'Test Group',
            createdAt: '2017-10-02T08:22:53.699Z',
            updatedAt: '2017-10-02T08:22:53.699Z'
          }
        ],
        groupId: 3,
        type: actionType.GET_GROUP_USERS
      }];
      store.dispatch(listAllUsers()).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });

    it('should make AJAX call to get all User Groups', (done) => {
      moxios.stubRequest(`/api/v1/user/${userid}/groups`, {
        status: 200,
        response: {
          userGroups: [
            {
              groupname: 'wemblys'
            },
            {
              groupname: 'wemblyss'
            }
          ] }
      });
      const store = mockStore({});
      const expectedAction = [{
        groups: [
          {
            groupname: 'wemblys'
          },
          {
            groupname: 'wemblyss'
          }],
        type: actionType.ALL_USERS_GROUPS
      }];
      store.dispatch(allUserGroups()).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
  });
});
