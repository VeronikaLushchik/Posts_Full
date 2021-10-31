/* eslint-disable */
import { AxiosResponse } from 'axios';
import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { SET_COMMENTS, ADD_COMMENT } from '../types';

import { postApi } from '../../api';

export const setComments = (comments: Comment[]) => ({ type: SET_COMMENTS, comments });

// export const loadComments = (postId:number) => async (dispatch: Dispatch) => {
//   try {
//     await postApi.getPostComments(postId)
//       .then((response: AxiosResponse<{}>) => {
//         dispatch(setComments(response.data as Comment[]));
//       });
//   } catch (e) {
//     // eslint-disable-next-line no-console
//     console.log('-------e', e);
//   }
// };

export const addNewComment = (comment: Partial<Comment>, postId: number)
: ThunkAction<void, RootState, unknown, AnyAction> => async dispatch => {
  try {
    await postApi.addComment(comment as Comment, postId as number);
    dispatch(addComment(comment as Comment));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('-------e', e);
  }
};

export const addComment = (comment:Comment) => (dispatch:Dispatch) => {
  dispatch({
    type: ADD_COMMENT,
    comment: comment,
  });
};

// export const setComments = (comments:Comment[]) => (dispatch:Dispatch) => {
//   dispatch({
//     type: SET_COMMENTS,
//     comments: comments,
//   });
// };

