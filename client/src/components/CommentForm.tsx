/* eslint-disable */
import React, { useMemo } from 'react';
import { Form, Formik, ErrorMessage } from 'formik';
import { Button, TextField } from '@mui/material';
import { validateComment } from '../validate';
import '../scss/createComment.scss';
import { storage } from '../utils';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

type Props = {
  match: any;
  addNewComment: (comment:Partial<Comment>, postId: number) => void,
};

export const CommentForm: React.FC<Props> = ({ addNewComment, match }) => {
  const user: any = useSelector<any>(state => state.authReducer.user)
  const initialValues = useMemo(() => ({ name: user.user.name, body: '', email: user?.user.email }), [])
  
  const handleSubmit = (values:any, { setSubmitting, resetForm }:any) => {
    const id = match?.params?.postId;
    
    addNewComment(values, id);
    setSubmitting(false);
    resetForm();
  }
  
  return (
    <div className="create_comment">
      {user &&
      <>
        <h1 className="create_comment__title">Add a comment</h1>
        <Formik
          initialValues={{ ...initialValues }}
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
