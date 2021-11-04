import { combineReducers } from 'redux';
import postsReducer from './postsReducer';
import authReducer from './authReducer';

export default combineReducers({ authReducer, postsReducer });
