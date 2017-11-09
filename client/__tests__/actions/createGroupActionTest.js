import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import * as actionType from '../../actions/types';
import addMemberToGroup from '../../actions/createGroupRequest';
import localStorageMock from '../../__mocks__/localStorageMock';

window.localStorage = localStorageMock;
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const groupId = 3;

describe('create Group Action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('create Group Action', () => {
    it('should make AJAX call to add member to group', (done) => {
      moxios.stubRequest(`/api/v1/group/${groupId}/user`, {
        status: 200,
        response: {
          groupId: 3,
          userId: 25,
          username: 'wambe',
          groupname: 'Test Group',
          updatedAt: '2017-11-07T09:00:53.100Z',
          createdAt: '2017-11-07T09:00:53.100Z',
          id: 16
        }
      });
      const store = mockStore({});
      const expectedAction = [{
        newGroup: {
          groupId: 3,
          userId: 25,
          username: 'wambe',
          groupname: 'Test Group',
          updatedAt: '2017-11-07T09:00:53.100Z',
          createdAt: '2017-11-07T09:00:53.100Z',
          id: 16
        },
        type: actionType.ADD_USER_TO_GROUP
      }];
      store.dispatch(addMemberToGroup()).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
  });
});
