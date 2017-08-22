/* global Materialize */
import axios from 'axios';
import { setCurrentUser, LOAD_GROUPS, LIST_GROUPS, LIST_GROUP_MESSAGES } from './types';
import loadGroups from './groups';


export const addMemberToGroup = groupInfo =>
  dispatch => axios.post('/api/group/:groupid/user', groupInfo)
  .then(() => {
    dispatch(loadGroups);
    Materialize.toast('Member successfully added', 5000, 'red');
  }).catch((error) => {
    throw (error);
  });
