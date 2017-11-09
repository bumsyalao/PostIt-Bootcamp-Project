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
        response: [
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
        ]
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

    it('should make AJAX call to post a new message', (done) => {
      moxios.stubRequest(`/api/v1/group/${groupId}/message`, {
        status: 200,
        response: {
          id: 7,
          userId: 25,
          groupId: 3,
          message: 'hey wassup b',
          messagePriority: 'normal',
          updatedAt: '2017-11-06T15:28:03.403Z',
          createdAt: '2017-11-06T15:28:03.403Z'
        }
      });
      const store = mockStore({});
      const expectedAction = [{
        message: {
          id: 7,
          userId: 25,
          groupId: 3,
          message: 'hey wassup b',
          messagePriority: 'normal',
          updatedAt: '2017-11-06T15:28:03.403Z',
          createdAt: '2017-11-06T15:28:03.403Z'
        },
        username: 'wambe',
        groupId: 3,
        type: actionType.LOAD_MESSAGE
      }];
      store.dispatch(newMessage()).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
  });
});
