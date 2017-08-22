import axios from 'axios';
import { LIST_GROUPS } from './types';

export const loadGroups = groups => ({
  type: LIST_GROUPS,
  groups
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
  axios
    .post('/api/group', { groupname })
    .then(() => {
      dispatch(getGroups());
    })
    .catch((error) => {
      throw error;
    });
