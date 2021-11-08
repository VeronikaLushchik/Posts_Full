/* eslint-disable */
import { Dispatch } from 'redux';
import { AUTH, LOGOUT } from '../types';
import { postApi } from '../../api';

export const signin = (formData:any, router:any) => async (dispatch: Dispatch) => {
  try {
    const { data } = await postApi.signIn(formData);

    dispatch({ type: AUTH, data });

    router.push('/');
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData:User, router:any) => async (dispatch: Dispatch) => {
  try {
    const { data } = await postApi.signUp(formData);

    dispatch({ type: AUTH, data });

    router.push('/');
  } catch (error) {
    console.log(error);
  }
};
