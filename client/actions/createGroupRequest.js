/* global Materialize */
import axios from 'axios';
import * as types from './types';


export const loadGroups = ({
  type: types.LOAD_GROUPS,
});

export const createGroupRequest = (groupname) => {
  return dispatch => axios.post('/api/group', { groupname })
    .then(() => {
      dispatch(loadGroups);
    }).catch((error) => {
      throw (error);
    });
};


export const addMemberToGroup = groupInfo =>
  dispatch => axios.post('/api/group/:groupid/user', groupInfo)
  .then(() => {
    dispatch(loadGroups);
    Materialize.toast('Member successfully added', 5000, 'red');
  }).catch((error) => {
    throw (error);
  });

