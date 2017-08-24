/* global */
import axios from 'axios';
import { ADD_USER_TO_GROUP } from './types';

const addUser = newGroup => ({
  type: ADD_USER_TO_GROUP,
  newGroup
});


const addMemberToGroup = groupId =>
  dispatch => axios.post(`/api/group/${groupId}/user`)
  .then((response) => {
    dispatch(addUser(response.data.newGroup));
  }).catch((error) => {
    throw (error);
  });

export default addMemberToGroup;
