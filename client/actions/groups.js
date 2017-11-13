/* global localStorage */
import axios from 'axios';
import {
  LIST_GROUPS, GET_GROUP_USERS, LIST_ALL_USERS, LIST_GROUP } from './types';
import attachAuthorizationToken from '../utils/attachToken';

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

export const loadAllUsers = users => ({
  type: LIST_ALL_USERS,
  users
});

export const getGroups = () => dispatch =>
  axios
    .get('/api/v1/groups')
    .then((response) => {
      dispatch(loadGroups(response.data.allGroups));
    })
    .catch((error) => {
      throw error;
    });

export const getGroup = groupid => dispatch =>
    axios
      .get(`/api/v1/group/${groupid}`)
      .then((response) => {
        dispatch(loadGroup(response.data.group));
      });

export const getAllUsers = (offset, limit = 5) => dispatch =>
    axios
     .get(`/api/v1/users?limit=${limit}&offset=${offset}`)
    .then((response) => {
      dispatch(loadAllUsers(response.data));
    })
    .catch((error) => {
      throw error;
    });

export const createGroup = groupName => dispatch =>
  attachAuthorizationToken(localStorage.getItem('token'))
    .post('/api/v1/group', { groupName })
    .then(() => {
      dispatch(getGroups());
    })
    .catch((error) => {
      throw error;
    });

export const listAllUsers = groupId => dispatch =>
    axios
    .get(`/api/v1/group/${groupId}/users`)
    .then((response) => {
      dispatch(loadUsers(response.data.users, groupId));
    })
    .catch((error) => {
      throw error;
    });

