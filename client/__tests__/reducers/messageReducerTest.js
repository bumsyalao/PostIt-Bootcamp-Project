/* global expect jest test */
import message from '../../reducers/messageReducer';
import { loadMessage, loadMessages } from '../../actions/messages';

const initialState = {
  messages: {}
};
const groupid = 1;
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
    console.log(newState);
    expect(newState.messagePriority).toEqual('normal');
  });
  it('should load messages when loadMessages is called', () => {
    const action = loadMessages(amessages, 59);
    const newState = message(initialState, action);
    console.log(newState);
    expect(newState.groupId).toEqual(59);
  });
  it('should return default state when no action is called', () => {
    const newState = message(initialState);
    console.log(newState);
    expect(newState.messages).toEqual({});
  });
});
