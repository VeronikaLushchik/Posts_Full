/* eslint-disable */
import { Dispatch } from 'redux';
import { AUTH } from '../types';
import { authApi } from '../../api';

export const signin = (formData:any, router:any) => async (dispatch: Dispatch) => {
  try {
    const { data } = await authApi.signIn(formData);

    dispatch({ type: AUTH, data });

    router.push('/posts');
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData:any, router:any) => async (dispatch: Dispatch) => {
  try {
    const { data } = await authApi.signUp(formData);

    dispatch({ type: AUTH, data });

    router.push('/posts');
  } catch (error) {
    console.log(error);
  }
};
