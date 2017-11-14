import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import * as actionType from '../../actions/types';
import { getMessages, newMessage } from '../../actions/messages';
import localStorageMock from '../../__mocks__/localStorageMock';

window.localStorage = localStorageMock;
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const id = 3;
const groupId = 3;

describe('Message Action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('Message action', () => {
    it('should make AJAX call to get messages', (done) => {
      moxios.stubRequest(`/api/v1/group/${id}/messages`, {
        status: 200,
        response: {
          messages: [
            {
              id: 2,
              groupId: 3,
              userId: 2,
              message: 'hi this is test User',
              messagePriority: 'normal',
              createdAt: '2017-10-02T08:23:27.461Z',
              updatedAt: '2017-10-02T08:23:27.461Z',
              User: {
                username: 'testuser'
              }
            }
          ] }
      });
      const store = mockStore({});
      const expectedAction = [{
        messages:
        {
          id: 2,
          groupId: 3,
          userId: 2,
          message: 'hi this is test User',
          messagePriority: 'normal',
          createdAt: '2017-10-02T08:23:27.461Z',
          updatedAt: '2017-10-02T08:23:27.461Z',
          User: {
            username: 'testuser'
          }
        },
        groupId: 3,
        type: actionType.GET_ALL_MESSAGES
      }];
      store.dispatch(getMessages()).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });


//   it('should not dispatch loadPlatformUsers when unsuccessful', () => {
//     mock.reset();
//     const store = mockStore({});
//     const offset = datas.offfset;
//     const searchUserData = datas.searchUser;
//     const userName = datas.userName;

//     mock.onPost(`api/users/list/${offset}`, searchUserData)
//     .reply(400, {
//       success: false,
//       message: 'An error has occured'
//     });

//     const expectedAction = datas.emptyAction;

//     return store.dispatch(searchUsers(offset, userName))
//     .then(() => {
//       expect(store.getActions()).toEqual(expectedAction);
//     });
//   });
// });

    it('should make AJAX call to post a new message', (done) => {
      moxios.stubRequest(`/api/v1/group/${groupId}/message`, {
        status: 200,
        response: {
          newMessage: {
            id: 44,
            userId: 119,
            groupId: 1,
            message: 'hi',
            messagePriority: 'normal',
            updatedAt: '2017-11-14T16:11:40.462Z',
            createdAt: '2017-11-14T16:11:40.462Z'
          },
          message: 'message posted succesfully'
        }
      });
      const store = mockStore({});
      const expectedAction = [{
        message: {
          id: 44,
          userId: 119,
          groupId: 1,
          message: 'hi',
          messagePriority: 'normal',
          updatedAt: '2017-11-14T16:11:40.462Z',
          createdAt: '2017-11-14T16:11:40.462Z'
        },
        username: 'test',
        groupId: 1,
        type: actionType.LOAD_MESSAGE
      }];
      store.dispatch(newMessage()).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
  });
});
