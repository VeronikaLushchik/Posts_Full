/* eslint-disable */
import React from 'react';
import { Formik, ErrorMessage } from 'formik';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { validatePost } from '../../validate';
import '../../scss/CreatePost.scss';
import { useCallback } from 'react';

type Props = {
  addNewPost: (post:Post) => void;
};

export const CreatePost: React.FC<Props> = ({ addNewPost }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
  },[]);

  const handleClose = useCallback(() => {
    setOpen(false);
  },[]);

  const handleSubmit = useCallback((values: Post, { resetForm, setSubmitting }:any) => {
    addNewPost(values);
    setSubmitting(false);
    resetForm();
    handleClose();
  },[]);

  return (
    <div className="create">
      <Button variant="outlined" size="large" onClick={handleOpen}>
        Create a post
      </Button>
      <Formik
        initialValues={{ title: '', body: '', comments: [], }}
        validationSchema={validatePost}
        onSubmit={handleSubmit}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Dialog open={open}>
            <DialogTitle>Create</DialogTitle>
            <DialogContent>
              <TextField
                placeholder="Title"
                name="title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
                className="create__input"
                helperText={<ErrorMessage name="title" />}
              />
              <TextField
                placeholder="Text"
                name="body"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.body}
                className="create__input"
                helperText={<ErrorMessage name="body" />}
                multiline
              />
            </DialogContent>
            <DialogActions>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="create__button"
                variant="contained"
                onClick={() => handleSubmit()}
              >
                Submit
              </Button>
              <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
          </Dialog>
        )}
      </Formik> 
    </div>
  );
};
