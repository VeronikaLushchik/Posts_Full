/* eslint-disable */
import { AnyAction } from 'redux';
import { AUTH, LOGOUT, SET_USER } from '../types';

const initialState: authState = {
  authData: null,
  loading: false,
  errors: null,
};

const authReducer = (state = initialState, action:AnyAction) => {
  switch (action.type) {
    case AUTH:
      
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));

      return { ...state, authData: action.data, loading: false, errors: null };
    case LOGOUT:
      localStorage.removeItem('profile');

      return { ...state, authData: null, loading: false, errors: null };
    default:
      return state;

    case SET_USER:
    
      return {
        ...state,
        data: action.data,
    };
  }
};

export default authReducer;
