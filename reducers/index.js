import { combineReducers } from 'redux';

import auth from './auth';
import app from './auth';
export default combineReducers({ auth, app });