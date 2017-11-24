/* global localStorage */
import axios from 'axios';
import {
  LIST_GROUPS, ADD_USER_TO_GROUP, GET_GROUP_USERS, LIST_GROUP }
  from './types';
import attachAuthorizationToken from '../utils/attachAuthorizationToken';


export const addUser = newGroup => ({
  type: ADD_USER_TO_GROUP,
  newGroup
});

export const loadGroup = group => ({
  type: LIST_GROUP,
  group
});

export const loadGroups = groups => ({
  type: LIST_GROUPS,
  groups
});

export const loadUsers = (users, groupId) => ({
  type: GET_GROUP_USERS,
  users,
  groupId
});

/**
 * api call to getGroup
 * @param {object} groupid
 * @return {object} returns group if the call is successful
 */
export const getGroups = userid => dispatch =>
  axios
    .get(`/api/v1/user/${userid}/groups`)
    .then((response) => {
      dispatch(loadGroups(response.data.userGroups));
    })
    .catch((error) => {
      throw error;
    });
/**
 * api call to getGroup
 * @param {object} groupid
 * @return {object} returns group if the call is successful
 */
export const getGroup = groupid => dispatch =>
    axios
      .get(`/api/v1/group/${groupid}`)
      .then((response) => {
        dispatch(loadGroup(response.data.group));
      });

/**
 * api call to createGroup
 * @param {object} groupName
 * @return {object} returns groupName if the call is successful
 */
export const createGroup = groupName => dispatch =>
  attachAuthorizationToken(localStorage.getItem('token'))
    .post('/api/v1/group', { groupName })
    .then(() => {
      dispatch(getGroups());
    })
    .catch((error) => {
      throw error;
    });

/**
 * api call to listAllUsers
 * @param {object} groupId
 * @return {object} returns users and groupId if the call is successful
 */
export const listAllUsers = groupId => dispatch =>
    axios
    .get(`/api/v1/group/${groupId}/users`)
    .then((response) => {
      dispatch(loadUsers(response.data.users, groupId));
    })
    .catch((error) => {
      throw error;
    });

/**
 * api call to joinGroup
 * @param {object} groupId
 * @return {object} returns newGroup if the call is successful
 */
export const joinGroup = groupId =>
  dispatch => axios.post(`/api/v1/group/${groupId}/user`)
  .then((response) => {
    dispatch(addUser(response.data.newGroup));
  }).catch((error) => {
    throw (error);
  });

/**
 * api call to addMemberToGroup
 * @param {object} groupId
 * @return {object} returns newGroup if the call is successful
 */
export const addMemberToGroup = (groupId, userId) =>
  dispatch => axios.post(`/api/v1/group/${groupId}/user/${userId}`)
  .then((response) => {
    dispatch(addUser(response.data.newGroup));
  }).catch((error) => {
    throw (error);
  });

