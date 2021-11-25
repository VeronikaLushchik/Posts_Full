/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../redux/types';
import { storage } from '../utils';

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
  const [user, setUser] = useState(storage.get('profile'));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  const logout = () => {
    dispatch({ type: LOGOUT });

    history.push('/auth');

    setUser(null);
  };

  useEffect(() => {

    setUser(storage.get('profile'));
  }, [location]);

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

        {user?.result ? (
          <ListItem
            className={classes.item}
            button
            onClick={logout}
          >
            <ListItemText primary={user?.result.name} />
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
