/* eslint-disable */
import { CircularProgress, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { CommentForm } from '../CommentForm';
import '../../scss/post.scss';

interface Props {
  post: Post;
  match: any;
  comments: Comment[];
  comment: null;
  // loadComments: (activePostId:number) => void;
  loadPost: (id:number) => void;
  addNewComment: (comment: Partial<Comment>, postId: number) => void;
}

const PostPage:React.FC<Props> = ({
  comment,
  post,
  match,
  loadPost,
  // loadComments,
  addNewComment,
  comments,
}) => {
  const id = match?.params?.postId;
  
  
  useEffect(() => {
    loadPost(id);
    // loadComments(id);
  }, [comment]);

  useEffect(() => {
    console.log(comments)
  }, [comments]);

  if (!post) {
    return (
      <section>
        <CircularProgress />
      </section>
    );
  }

  return (
    <>
      <section>
        <article className="post">
          <Typography variant="h3" component="h2">
            {post.title}
          </Typography>
          <p className="post__text">{post.body}</p>
          <div className="post__comments">Comments</div>
          <ul className="post__comment">
            {post?.comments?.map((currentComment: Partial<Comment>) =>
              <div className="post__card" key={currentComment.name}>
                <li className="post__title">{currentComment.name}</li>
                <li className="post__email">
                  <a className="post__email" href="#">{currentComment.email}</a>
                </li>
                <li className="post__body">{currentComment.body}</li>
              </div>)}
          </ul>
        </article>
      </section>
      <CommentForm addNewComment={addNewComment} match={match} />
    </>
  );
}

export default PostPage;
