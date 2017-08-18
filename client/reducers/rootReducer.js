import { combineReducers } from 'redux';

import access from './accessReducer';
import group from './groupsReducer';

export default combineReducers({
  access,
  group
});
