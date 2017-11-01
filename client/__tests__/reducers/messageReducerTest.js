/* global expect jest test */
import message from '../../reducers/messageReducer';
import { loadMessage, loadMessages } from '../../actions/messages';

const initialState = {
  messages: {}
};
const groupid = 1;
const newMessage = {
  message: 'Hi My name is Banku and I\'m Ghanian',
  messagePriority: 'normal',
  createdAt: '2017-10-02T08:21:36.184Z',
  updatedAt: '2017-10-02T08:21:36.184Z',
  User: {
    username: 'banku'
  }
};


describe('Message Reducer', () => {
  it('should load a message when loadMessage is called', () => {
    const action = loadMessage(newMessage, groupid);
    const newState = message(initialState, action);
    console.log(newState);
    expect(newState.messagePriority).toEqual('normal');
  });
  it('should load messages when loadMessages is called', () => {
    const action = loadMessages(newMessage, groupid);
    const newState = message(initialState, action);
    console.log(newState);
    expect(newState.groupId).toEqual(1);
  });
  it('should return default state when no action is called', () => {
    const newState = message(initialState);
    console.log(newState);
    expect(newState.messages).toEqual({});
  });
});
