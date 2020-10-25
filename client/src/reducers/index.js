import { combineReducers } from 'redux';

import alert from "./alert";
import user from "./user";
import form from "./form";
import file from "./file";

export default combineReducers({
  alert,
  user,
  form,
  file
});