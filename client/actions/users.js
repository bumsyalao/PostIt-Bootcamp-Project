/* global localStorage */
import axios from 'axios';
import { LIST_GROUPS, GET_GROUP_USERS, LIST_ALL_USERS } from './types';
import attachAuthorizationToken from '../utils/attachToken';

export const loadUsers = (users, groupId) => ({
  type: GET_GROUP_USERS,
  users,
  groupId
});

export const loadAllUsers = users => ({
  type: LIST_ALL_USERS,
  users
});

export const getAllUsers = (offset = 0, limit = 5, searchParam = '') => dispatch =>
  axios
    .get(`/api/users?limit=${limit}&offset=${offset}&searchParam=${searchParam}`)
    .then((response) => {
      dispatch(loadAllUsers(response.data));
    })
    .catch((error) => {
      throw error;
    });

export const listAllUsers = groupId => dispatch =>
    axios
    .get(`/api/group/${groupId}/users`)
    .then((response) => {
      dispatch(loadUsers(response.data.users, groupId));
    })
    .catch((error) => {
      throw error;
    });