/* eslint-disable */
import { makeStyles } from '@mui/styles';
import React from 'react';
import {
  List, ListItem, ListItemText, 
} from '@mui/material';
import { useHistory } from 'react-router';

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

type Props = {
  children: React.ReactNode;
};

export const Layout: React.FC<Props> = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();

  const menuItems = [
    {
      text: 'Posts',
      path: '/',
    },
    {
      text: 'Add new post',
      path: '/create',
    },
  ];

  return (
    <div className={classes.root}>
      <List className={classes.drawer}>
        {menuItems.map(item => (
          <ListItem
            className={classes.item}
            button
            key={item.text}
            onClick={() => history.push(item.path)}
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <div className={classes.page}>
        {children}
      </div>
    </div>
  );
};
