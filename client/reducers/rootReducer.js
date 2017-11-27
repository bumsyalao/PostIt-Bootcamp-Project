import { combineReducers } from 'redux';

import access from './accessReducer';
import group from './groupsReducer';
import messages from './messageReducer';
import users from './usersReducer';

export default combineReducers({
  access,
  users,
  group,
  messages
});
