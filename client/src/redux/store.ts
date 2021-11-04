/* eslint-disable */
import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../redux/reducers';
// import postsReducer from '../redux/reducers/postsReducer';
// import authReducer from '../redux/reducers/authReducer';


export const store = createStore(
  reducers, 
  applyMiddleware(thunk),
);
