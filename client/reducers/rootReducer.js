import { combineReducers } from 'redux';

import access from './accessReducer';
import group from './groupsReducer';
import messages from './messageReducer';

export default combineReducers({
  access,
  group,
  messages
});
