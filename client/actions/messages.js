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

export const getMessages = id =>
 dispatch => axios.get(`/api/group/${id}/messages`)
 .then((response) => {
   console.log(response.data);
   dispatch(loadMessages(response.data, id));
 })
.catch((error) => { throw error; });

export const newMessage = (groupId, username, data) =>
dispatch => axios.post(`/api/group/${groupId}/message`, data)
 .then((response) => {
   dispatch(loadMessage(response.data, username, groupId));
 })
  .catch((error) => { throw error; });