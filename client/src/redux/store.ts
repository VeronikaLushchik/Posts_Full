import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { postsReducer } from './reducers/postsReducer';

export const store = createStore(
  postsReducer,
  applyMiddleware(thunk),
);
