/* global localStorage */
import axios from 'axios';
import { LIST_GROUPS, GET_GROUP_USERS, LIST_ALL_USERS, ALL_USERS_GROUPS } from './types';
import attachAuthorizationToken from '../utils/attachToken';

export const loadUsers = (users, groupId) => ({
  type: GET_GROUP_USERS,
  users,
  groupId
});

export const loadAllUsers = ({ users, metaData }) => ({
  type: LIST_ALL_USERS,
  users,
  metaData
});

export const getUserGroups = groups => ({
  type: ALL_USERS_GROUPS,
  groups
});

export const getAllUsers = (offset = 0, limit = 5, searchParam = '') => dispatch =>
  axios
    .get(`/api/v1/users?limit=${limit}&offset=${offset}&searchParam=${searchParam}`)
    .then((response) => {
      console.log(response.data);
      if (!response.data.users.length > 0) {
        Materialize.toast('User not found', 5000, 'red');
      }
      dispatch(loadAllUsers(response.data));
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

export const allUserGroups = userid => dispatch =>
    axios
    .get(`/api/v1/user/${userid}/groups`)
    .then((response) => {
      console.log(response.data);
      dispatch(getUserGroups(response.data));
    })
    .catch((error) => {
      throw error;
    });
