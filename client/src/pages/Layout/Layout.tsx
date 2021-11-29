/* eslint-disable */
import { makeStyles } from '@mui/styles';
import React from 'react';
import Navbar from '../../components/Navbar';

const useStyles = makeStyles({
  page: {
    maxWidth: '1200px',
    height: '100%',
    padding: '70px',
    fontSize: '16px',
    fontWight: '400',
    lineHeight: '1.5',
  },

  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

  },
});

type Props = {
  children: React.ReactNode;
};

export const Layout: React.FC<Props> = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Navbar />
      <div className={classes.page}>
        {children}
      </div>
    </div>
  );
};
