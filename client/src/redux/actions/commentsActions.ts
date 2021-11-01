/* eslint-disable */
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { postApi } from '../../api';

export const addNewComment = (comment: Partial<Comment>, postId: number)
: ThunkAction<void, RootState, unknown, AnyAction> => async dispatch => {
  try {
    await postApi.addComment(comment as Comment, postId as number);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('-------e', e);
  }
};
