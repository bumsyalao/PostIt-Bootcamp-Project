/* global Materialize */
import axios from 'axios';
import { setCurrentUser, LOAD_GROUPS, LIST_GROUPS, LIST_GROUP_MESSAGES } from './types';

export const loadGroups = ({
  type: LOAD_GROUPS,
});

export const createGroupRequest = (groupname, id) => dispatch => axios.post('/api/group', { groupname, id })
    .then(() => {
      dispatch(loadGroups);
    }).catch((error) => {
      throw (error);
    });

export const groupsRequest = () => dispatch => axios.get('/api/groups')
  .then((response) => {
    dispatch(setCurrentUser(response.data, LIST_GROUPS));
  })
  .catch((error) => {
    throw (error);
  });

export const addMemberToGroup = groupInfo =>
  dispatch => axios.post('/api/group/:groupid/user', groupInfo)
  .then(() => {
    dispatch(loadGroups);
    Materialize.toast('Member successfully added', 5000, 'red');
  }).catch((error) => {
    throw (error);
  });

export const getMessages = id =>
  dispatch => axios.get(`/api/group/${id}/messages`)
    .then((response) => {
      dispatch(setCurrentUser(response.data.messages, LIST_GROUP_MESSAGES));
    }).catch((error) => {
      throw (error);
    });

