/* eslint-disable */
import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { SET_POSTS, SET_POST, SET_LOADER, SET_SEARCH_VALUE, SET_SELECT_VALUE, SET_SELECT_PAGE, SET_SELECT_VIEW, SET_ADD_FAVORITE, ERROR_POSTS, FETCH_POSTS, ERROR_POST, } from '../types';

import { postApi } from '../../api';

export const setPosts = (posts: Post[]) => ({ type: SET_POSTS, posts });
export const setPost = (post: Post) => ({ type: SET_POST, post });
export const setLoader = (loader: boolean) => ({ type: SET_LOADER, loader });


export const loadPosts = (
) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: FETCH_POSTS });
    setTimeout(async () => {
      const response = await postApi.getPosts()
      const json = await response.data;
    dispatch(setPosts(json as Post[]));
    }, 1000);
  } catch (e) {
    dispatch({ type: ERROR_POSTS });
  }
};

export const loadPost = (id:number
  ) => async (dispatch: Dispatch) => {
    try {
      setTimeout(async () => {
        const response = await postApi.getPost(id)
        const json = await response.data;
        dispatch(setPost(json as Post));
      }, 0);
    } catch (e) {
     dispatch({ type: ERROR_POST });
    }
  };

export const addNewPost = (post: Post)
: ThunkAction<void, RootState, unknown, AnyAction> => async dispatch => {
  try {
    const resp = await postApi.addPost(post);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('-------e', e);
  }
};

export const setSearchValue = (query:string) => (dispatch:Dispatch) => {
  dispatch({
    type: SET_SEARCH_VALUE,
    query: query,
  });
};

export const setSelectValue = (select:string) => (dispatch:Dispatch) => {
  dispatch({
    type: SET_SELECT_VALUE,
    select: select,
  });
};

export const setSelectPage = (page:string) => (dispatch:Dispatch) => {
  dispatch({
    type: SET_SELECT_PAGE,
    page: page,
  });
};

export const setSelectView = (view:string) => (dispatch:Dispatch) => {
  dispatch({
    type: SET_SELECT_VIEW,
    view: view,
  });
};

  export const setFavoriteList = (favorite:number[]) => (dispatch:Dispatch) => {
    dispatch({
      type: SET_ADD_FAVORITE,
      favorite: favorite,
    });
  };
