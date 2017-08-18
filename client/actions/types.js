export const ADD_FLASH_MESSAGE = 'ADD_FLASH_MESSAGE';
export const SIGN_IN_USER = 'SIGN_IN_USER';
export const SIGN_UP_USER = 'SIGN_UP_USER';
export const SIGN_OUT_USER = 'SIGN_OUT_USER';
export const CREATE_GROUP_SUCCESS = 'CREATE_GROUP_SUCCESS';
export const ADD_MEMBER_TO_GROUP = 'ADD_MEMBER_TO_GROUP';
export const LOAD_GROUPS = 'LOAD_GROUPS';
export const LIST_GROUPS = 'LIST_GROUPS';
export const LIST_GROUP_MESSAGES = 'LIST_GROUP_MESSAGES';
export const setCurrentUser = (userInfo, type) => ({
  type,
  userInfo
});
