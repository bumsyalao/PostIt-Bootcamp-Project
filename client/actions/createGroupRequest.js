/* global */
import axios from 'axios';
import { ADD_USER_TO_GROUP } from './types';

export const addUser = newGroup => ({
  type: ADD_USER_TO_GROUP,
  newGroup
});


const addMemberToGroup = groupId =>
  dispatch => axios.post(`/api/v1/group/${groupId}/user`)
  .then((response) => {
    dispatch(addUser(response.data.newGroup));
  }).catch((error) => {
    throw (error);
  });

export default addMemberToGroup;
