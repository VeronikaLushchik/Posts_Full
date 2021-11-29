/* eslint-disable */
import { AnyAction } from 'redux';
import { storage } from '../../utils';
import { AUTH, LOGOUT, SET_USER } from '../types';

const initialState: authState = {
  authData: null,
  token: null,
  loading: false,
  errors: null,
  user: null,
};

const authReducer = (state = initialState, action:AnyAction) => {
  switch (action.type) {
    case AUTH:
      storage.set('token', action.data.token)
      return { ...state, token: action.data.token, authData: action.data, user: action.data.result, loading: false, errors: null };
    case LOGOUT:
      localStorage.removeItem('token');

      return { ...state, authData: null, loading: false, errors: null, user: null };
      case SET_USER:

        return { ...state, authData: null, loading: false, errors: null, user: action.data };
    default:
      return state; 
  }
};

export default authReducer;
