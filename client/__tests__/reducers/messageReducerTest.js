/* global expect test */
import message from '../../reducers/messageReducer';
import { loadMessage, loadMessages } from '../../actions/messages';

const initialState = {
  messages: {}
};

const newMessage = {
  id: 47,
  userId: 119,
  groupId: 1,
  message: 'hi',
  messagePriority: 'normal',
  updatedAt: '2017-11-14T22:59:39.748Z',
  createdAt: '2017-11-14T22:59:39.748Z'
};

const amessages = [
  {
    id: 46,
    groupId: 59,
    userId: 1,
    message: 'Hi',
    messagePriority: 'normal',
    createdAt: '2017-11-14T20:54:34.224Z',
    updatedAt: '2017-11-14T20:54:34.224Z',
    User: {
      username: 'bantu'
    }
  }
];


describe('Message Reducer', () => {
  it('should load a message when loadMessage is called', () => {
    const action = loadMessage(newMessage, 'test', 1);
    const newState = message(initialState, action);

    expect(newState['1'][0].messagePriority).toEqual('normal');
  });
  it('should load messages when loadMessages is called', () => {
    const action = loadMessages(amessages, 59);
    const newState = message(initialState, action);

    expect(Object.keys(newState)[0]).toEqual('59');
  });
  it('should return default state when no action is called', () => {
    const newState = message(initialState);

    expect(newState.messages).toEqual({});
  });
});
