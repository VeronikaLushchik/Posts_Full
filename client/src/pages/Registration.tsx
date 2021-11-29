/* eslint-disable */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Paper, Grid, Typography, Container } from '@mui/material';
import { useHistory } from 'react-router-dom';

import { signin, signup } from '../redux/actions/authActions';
import { Input } from '../components/Input';

const initialState = { photo: '', firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Registration = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const [showPassword, setShowPassword] = useState(false);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();

    if (isSignup) {
      let data = new FormData();
      data.append("photo", form.photo);
      data.append("firstName", form.firstName);
      data.append("lastName", form.lastName);
      data.append("email", form.email);
      data.append("password", form.password);
      data.append("confirmPassword", form.confirmPassword);

      dispatch(signup(data, history));
    } else {
      dispatch(signin(form, history));
    }
  };

  const handleChange = (e:any) => setForm({ ...form, [e.target.name]: e.target.value });
  const handlePhoto = (e:any) => setForm({...form, photo: e.target.files[0]})
  
  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6}>
        <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
        <form onSubmit={handleSubmit} style={{padding: '10px'}} method="post" encType='multipart/form-data'>
          <Grid container spacing={2}>
            { isSignup && (
            <>
             <input 
                type="file" 
                accept=".png, .jpg, .jpeg"
                name="photo"
                onChange={handlePhoto}
            />

              <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
              <Input name="lastName" label="Last Name" handleChange={handleChange} half />
            </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} />
            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" style={{marginTop: '10px'}}>
            { isSignup ? 'Sign Up' : 'Sign In' }
          </Button>
            <Grid item >
              <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>
            </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Registration;