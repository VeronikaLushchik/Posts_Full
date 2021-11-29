/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT } from '../redux/types';

const useStyles = makeStyles({
  page: {
    maxWidth: '1200px',
    height: '100%',
    padding: '70px',
    fontSize: '16px',
    fontWight: '400',
    lineHeight: '1.5',
  },

  drawer: {
    width: '100%',
    display: 'flex',
    height: '50px',
    background: '#f4f4f4',
    textTransform: 'uppercase',
  },

  item: {
    justifyContent: 'start',
    maxWidth: '150px',
  },

  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

  },
  active: {
    background: '#f4f4f4',
  },
});

const Navbar = () => {
  let user: any = useSelector<any>(state => state.authReducer.user)
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const logout = () => {
    dispatch({ type: LOGOUT });

    history.push('/auth');

  };

  return (
    <>
      <List className={classes.drawer}>
        <ListItem
          className={classes.item}
          button
          onClick={() => history.push('/posts')}
        >
          <ListItemText primary="Posts" />
        </ListItem>

        {user ? (
          <ListItem
            className={classes.item}
            button
            onClick={logout}
          >
            <ListItemText primary={user?.name} />
          </ListItem>
          
        ) : (
          <ListItem
            className={classes.item}
            button
            onClick={() => history.push('/auth')}
          >
            <ListItemText primary="Sing in" />
          </ListItem>
        )}
      </List>
    </>
  );
};

export default Navbar;
