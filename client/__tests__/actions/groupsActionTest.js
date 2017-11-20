import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import * as actionType from '../../actions/types';
import {
  getGroups, addMemberToGroup, getGroup, createGroup, listAllUsers
} from '../../actions/groups';
import localStorageMock from '../../__mocks__/localStorageMock';

window.localStorage = localStorageMock;
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const groupid = 1;
const groupId = 3;

describe('Group Action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('Group Action', () => {
    it('should make AJAX call to get all groups', (done) => {
      moxios.stubRequest('/api/v1/groups', {
        status: 200,
        response: {
          allGroups: [

            {
              id: 1,
              groupName: 'Trap'
            },
            {
              id: 2,
              groupName: 'Banku Group'
            },
            {
              id: 3,
              groupName: 'Test Group'
            },
            {
              id: 4,
              groupName: 'Wambui'
            }
          ] }
      });
      const store = mockStore({});
      const expectedAction = [{
        groups: [

          {
            id: 1,
            groupName: 'Trap'
          },
          {
            id: 2,
            groupName: 'Banku Group'
          },
          {
            id: 3,
            groupName: 'Test Group'
          },
          {
            id: 4,
            groupName: 'Wambui'
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
          group: {
            id: 1,
            groupName: 'new stuff',
            createdAt: '2017-11-10T12:39:03.581Z',
            updatedAt: '2017-11-10T12:39:03.581Z'
          }
        }
      });
      const store = mockStore({});
      const expectedAction = [{
        group: {
          id: 1,
          groupName: 'new stuff',
          createdAt: '2017-11-10T12:39:03.581Z',
          updatedAt: '2017-11-10T12:39:03.581Z'
        },
        type: actionType.LIST_GROUP
      }];
      store.dispatch(getGroup()).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });


    it('should make AJAX call to createGroup', (done) => {
      moxios.stubRequest('/api/v1/group', {
        status: 200,
        response: {
          savedGroup: {
            groupId: 58,
            userId: 119,
            username: 'test',
            groupName: 'gguj',
            updatedAt: '2017-11-14T15:08:44.490Z',
            createdAt: '2017-11-14T15:08:44.490Z',
            id: 33
          },
          message: 'group created'
        }
      });
      const store = mockStore({});
      const expectedAction = [];
      store.dispatch(createGroup({
        groupName: 'gguj'
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
              groupName: 'Test Group',
              createdAt: '2017-10-02T08:21:15.374Z',
              updatedAt: '2017-10-02T08:21:15.374Z'
            },
            {
              groupId: 3,
              userId: 2,
              username: 'testuser',
              groupName: 'Test Group',
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
            groupName: 'Test Group',
            createdAt: '2017-10-02T08:21:15.374Z',
            updatedAt: '2017-10-02T08:21:15.374Z'
          },
          {
            groupId: 3,
            userId: 2,
            username: 'testuser',
            groupName: 'Test Group',
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

  describe('create Group Action', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    describe('Add member member to group Action', () => {
      it('should make AJAX call to add member to group', (done) => {
        moxios.stubRequest(`/api/v1/group/${groupId}/user`, {
          status: 200,
          response: {
            newGroup: {
              groupId: 1,
              userId: 119,
              username: 'test',
              groupName: 'new stuff',
              updatedAt: '2017-11-14T11:44:24.574Z',
              createdAt: '2017-11-14T11:44:24.574Z',
              id: 32
            },
            message: 'User succesfully added to group'
          }
        });
        const store = mockStore({});
        const expectedAction = [{
          newGroup: {
            groupId: 1,
            userId: 119,
            username: 'test',
            groupName: 'new stuff',
            updatedAt: '2017-11-14T11:44:24.574Z',
            createdAt: '2017-11-14T11:44:24.574Z',
            id: 32
          },
          message: 'User succesfully added to group',
          type: actionType.ADD_USER_TO_GROUP
        }];
        store.dispatch(addMemberToGroup()).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
        done();
      });
    });
  });
});
