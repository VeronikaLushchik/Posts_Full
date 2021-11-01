/* eslint-disable */
import React from 'react';
import { Form, Formik, ErrorMessage } from 'formik';
import { Button, TextField } from '@mui/material';
import { validateComment } from '../validate';
import '../scss/createComment.scss';

type Props = {
  match: any;
  addNewComment: (comment:Partial<Comment>, postId: number) => void,
};

export const CommentForm: React.FC<Props> = ({ addNewComment, match }) => {
  return (
    <div className="create_comment">
      <h1 className="create_comment__title">Add a comment</h1>
      <Formik
        initialValues={{ name: '', body: '', email: '' }}
        validationSchema={validateComment}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          const id = match?.params?.postId;

          addNewComment(values, id);
          setSubmitting(false);
          resetForm();
        }}
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
              placeholder="Name"
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              className="create_comment__input"
              helperText={<ErrorMessage name="name" />}
            />
            <TextField
              placeholder="Email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              className="create_comment__input"
              helperText={<ErrorMessage name="email" />}
            />
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
    </div>
  );
};
