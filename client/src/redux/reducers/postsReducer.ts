/* eslint-disable */
import { AnyAction } from 'redux';
import {
  SET_POSTS,
  SET_POST,
  SET_COMMENTS,
  SET_SEARCH_VALUE,
  SET_SELECT_VALUE,
  SET_SELECT_PAGE,
  SET_SELECT_VIEW,
  SET_ADD_FAVORITE,
  ADD_POST,
  FETCH_POSTS,
  ERROR_POSTS,
  ERROR_POST,
  ADD_COMMENT
} from '../types';

const initialState: RootState = {
  posts: [],
  post: null,
  comments: [],
  comment: null,
  query: '',
  select: '',
  page: '6',
  view: 'module',
  favorite: [],
  isFetching: false,
  isFetchingPost: false,
};

export const postsReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_POSTS:
      return {
        ...state,
        posts: action.posts,
        isFetching: false,
      };

    case SET_POST:
      return {
        ...state,
        post: action.post,
      };

    case SET_COMMENTS:
      return {
        ...state,
        comments: action.post.comments,
      };

      case ADD_COMMENT: {
        return {
            ...state,
            comments: [action.comment, ...state.comments],
        };
      }

    case SET_SEARCH_VALUE: {
      return {
          ...state,
          query: action.query,
      };
    }

    case SET_SELECT_VALUE: {
      return {
          ...state,
          select: action.select,
      };
    }

    case SET_SELECT_PAGE: {
      return {
          ...state,
          page: action.page,
      };
    }

    case SET_SELECT_VIEW: {
      return {
          ...state,
          view: action.view,
      };
    }

    case SET_ADD_FAVORITE: {
      return {
          ...state,
          favorite: action.favorite,
      };
    }

    case ADD_POST: {
      return {
          ...state,
          posts: [action.post, ...state.posts],
      };
    }
    case FETCH_POSTS:{
      return {
          ...state,
          isFetching: true,
        };
    }

    case ERROR_POSTS: {
      return {
          ...state,
          isFetching: false
        }
    }

    case ERROR_POST: {
      return {
          ...state,
          isFetching: false
        }
    }

    default:
      return state;
  }
};
