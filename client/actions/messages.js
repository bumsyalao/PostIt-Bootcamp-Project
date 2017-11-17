import axios from 'axios';
import { GET_ALL_MESSAGES, LOAD_MESSAGE } from './types';

export const loadMessages = (messages, groupId) => ({
  type: GET_ALL_MESSAGES,
  messages,
  groupId
});

export const loadMessage = (message, username, groupId) => ({
  type: LOAD_MESSAGE,
  message,
  groupId,
  username
});
/**
 * api call to getMessages
 * @param {object} id
 * @return {object} returns messages, id if the call is successful
 */
export const getMessages = id =>
 dispatch => axios.get(`/api/v1/group/${id}/messages`)
 .then((response) => {
   dispatch(loadMessages(response.data.messages, id));
 })
.catch((error) => { throw error; });

/**
 * api call to create newMessage
 * @param {object} groupId, username, message
 * @return {object} returns messages, username, groupId if the call is successful
 */
export const newMessage = (groupId, username, message) =>
dispatch => axios.post(`/api/v1/group/${groupId}/message`, message)
 .then((response) => {
   dispatch(loadMessage(response.data.newMessage, username, groupId));
 })
  .catch((error) => { throw error; });
