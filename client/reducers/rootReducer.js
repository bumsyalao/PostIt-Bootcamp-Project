import { combineReducers } from 'redux';

import flashMessages from './flashMessages';
import access from './accessReducer';

export default combineReducers({
  flashMessages,
  access
});
