import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import * as actionType from '../../actions/types';
import { getGroups, getGroup, getAllUsers, createGroup, listAllUsers } from '../../actions/groups';
import localStorageMock from '../../__mocks__/localStorageMock';

window.localStorage = localStorageMock;
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const groupid = 1;
const limit = 5;
const offset = 0;
const groupId = 3;

describe('Group Action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('Group Action', () => {
    it('should make AJAX call to get all groups', (done) => {
      moxios.stubRequest('/api/v1/groups', {
        status: 200,
        response: [

          {
            id: 1,
            groupname: 'Trap'
          },
          {
            id: 2,
            groupname: 'Banku Group'
          },
          {
            id: 3,
            groupname: 'Test Group'
          },
          {
            id: 4,
            groupname: 'Wambui'
          }
        ]
      });
      const store = mockStore({});
      const expectedAction = [{
        groups: [

          {
            id: 1,
            groupname: 'Trap'
          },
          {
            id: 2,
            groupname: 'Banku Group'
          },
          {
            id: 3,
            groupname: 'Test Group'
          },
          {
            id: 4,
            groupname: 'Wambui'
          }
        ],
        type: actionType.LIST_GROUPS
      }];
      store.dispatch(getGroups()).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });

    it('should make AJAX call to get a group', (done) => {
      moxios.stubRequest(`/api/v1/group/${groupid}`, {
        status: 200,
        response: {
          id: 1,
          groupname: 'Trap',
          createdAt: '2017-10-02T08:20:40.859Z',
          updatedAt: '2017-10-02T08:20:40.859Z'
        }
      });
      const store = mockStore({});
      const expectedAction = [{
        group: {
          id: 1,
          groupname: 'Trap',
          createdAt: '2017-10-02T08:20:40.859Z',
          updatedAt: '2017-10-02T08:20:40.859Z'
        },
        type: actionType.LIST_GROUP
      }];
      store.dispatch(getGroup()).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });

    it('should make AJAX call to get all Users', (done) => {
      moxios.stubRequest(`/api/v1/users?limit=${limit}&offset=${offset}`, {
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
        type: actionType.LIST_ALL_USERS
      }];
      store.dispatch(getAllUsers()).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });

    it('should make AJAX call to createGroup', (done) => {
      moxios.stubRequest('/api/v1/group', {
        status: 200,
        response: {
          groupId: 9,
          userId: 25,
          username: 'wambe',
          groupname: 'wemblys',
          updatedAt: '2017-11-06T12:09:37.075Z',
          createdAt: '2017-11-06T12:09:37.075Z',
          id: 14
        }
      });
      const store = mockStore({});
      const expectedAction = [];
      store.dispatch(createGroup({
        groupname: 'wemblys'
      })).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });

    it('should Make AJAX call to list All Users', (done) => {
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
  });
});
