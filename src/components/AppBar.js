import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    },
    appbar: {
        marginBottom : '16px'
    }
}));

const MyAppbar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
          <AppBar className={classes.appbar} position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            Restaurant Finder
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default MyAppbar