/* global localStorage */
import axios from 'axios';
import { LIST_GROUPS, GET_GROUP_USERS } from './types';
import attachAuthorizationToken from '../utils/attachToken';

export const loadGroups = groups => ({
  type: LIST_GROUPS,
  groups
});

export const loadUsers = (users, groupId) => ({
  type: GET_GROUP_USERS,
  users,
  groupId
});

export const getGroups = () => dispatch =>
  axios
    .get('/api/groups')
    .then((response) => {
      dispatch(loadGroups(response.data));
    })
    .catch((error) => {
      throw error;
    });

export const createGroup = groupname => dispatch =>
  attachAuthorizationToken(localStorage.getItem('token'))
    .post('/api/group', { groupname })
    .then(() => {
      dispatch(getGroups());
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
