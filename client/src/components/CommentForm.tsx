/* eslint-disable */
import React from 'react';
import { Form, Formik, ErrorMessage } from 'formik';
import { Button, TextField } from '@mui/material';
import { validateComment } from '../validate';
import '../scss/createComment.scss';
import { storage } from '../utils';
import { useCallback } from 'react';

type Props = {
  match: any;
  addNewComment: (comment:Partial<Comment>, postId: number) => void,
};

export const CommentForm: React.FC<Props> = ({ addNewComment, match }) => {
  const user = storage.get('profile');

  const handleSubmit = useCallback((values:any, { setSubmitting, resetForm }:any) => {
    const id = match?.params?.postId;

    addNewComment(values, id);
    setSubmitting(false);
    resetForm();
  }, [])

  return (
    <div className="create_comment">
      {user &&
      <>
        <h1 className="create_comment__title">Add a comment</h1>
        <Formik
          initialValues={{ name: user?.result?.name, body: '', email: user?.result?.email }}
          validationSchema={validateComment}
          onSubmit={handleSubmit}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit} className="create_comment__form">
              <TextField 
                placeholder="Text"
                name="body"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.body}
                className="create_comment__input"
                helperText={<ErrorMessage name="body" />}
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="create_comment__button"
                variant="contained"
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </>
    }
    </div>
    );
};
